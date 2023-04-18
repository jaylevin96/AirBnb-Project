const express = require('express')
const router = express.Router();
const { Booking, Review, SpotImage, ReviewImage, Spot, User } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')
const { Op } = require("sequelize");

router.get('/current', requireAuth, async (req, res) => {
    let { user } = req;
    user = user.dataValues;
    let Bookings = await Booking.findAll({
        where: { userId: user.id },
        include: {
            model: Spot,
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            }
        }
    })
    for (let booking of Bookings) {
        let spot = booking.dataValues.Spot.dataValues;
        let imagePreview = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        });
        if (imagePreview) {
            spot.previewImage = imagePreview.url
        }
    }
    res.json({ Bookings })

})


router.put('/:bookingId', requireAuth, async (req, res) => {

    let booking = await Booking.findByPk(req.params.bookingId)
    let spot = await Spot.findByPk(booking.spotId);
    const { startDate, endDate } = req.body;
    let { user } = req;
    user = user.toJSON()
    let todaysDate = new Date;
    let errors = {};
    let conflict = false;
    if (!booking || booking.userId !== user.id) {
        res.status(404);
        return res.json({ message: "Booking couldn't be found" })
    }
    if (booking.endDate < todaysDate) {
        res.status(403);
        return res.json({ message: "Past bookings can't be modified" })
    }

    let allBookingsBefore = await spot.getBookings({
        where: {
            "endDate": {
                [Op.gte]: startDate
            },
            "startDate": {
                [Op.lte]: startDate
            },
            "id": {
                [Op.not]: booking.id
            }
        }
    });
    if (allBookingsBefore.length) {
        errors.startDate = "Start date conflicts with an existing booking"
        conflict = true;
    }
    let allBookingsAfter = await spot.getBookings({
        where: {
            "startDate": {
                [Op.lte]: endDate
            },
            "endDate": {
                [Op.gte]: endDate
            },
            "id": {
                [Op.not]: booking.id
            }
        }
    })

    if (allBookingsAfter.length) {
        errors.endDate = "End date conflicts with an existing booking"
        conflict = true
    }
    if (conflict) {
        res.status(403)
        return res.json({
            message: "Sorry, this spot is already booked for the specific dates",
            errors
        })
    }

    booking.startDate = new Date(startDate);
    booking.endDate = new Date(endDate);
    await booking.save();
    res.json(booking);

})

router.delete("/:bookingId", requireAuth, async (req, res) => {
    let booking = await Booking.findByPk(req.params.bookingId)
    let { user } = req;
    user = user.toJSON()
    let todaysDate = new Date;

    if (!booking || booking.userId !== user.id) {
        res.status(404);
        return res.json({ message: "Booking couldn't be found" })
    }
    if (booking.startDate > todaysDate) {
        res.status(403)
        return res.json({ message: "Bookings that have been started can't be deleted" })
    }

    await booking.destroy();
    return res.json({ message: "successfully deleted" })
})

module.exports = router;

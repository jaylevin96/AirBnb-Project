const express = require('express')
const router = express.Router();
const { Booking, Review, SpotImage, ReviewImage, Spot, User } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')

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

module.exports = router;

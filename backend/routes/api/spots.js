const express = require('express')
const router = express.Router();
const { Spot, Review, ReviewImage, SpotImage, User } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')



router.get('/', async (req, res) => {
    let spots = await Spot.findAll({ raw: true });

    let reviews = await Review.findAll({
        attributes: {
            include: ['spotId', 'stars']
        },
        raw: true
    })
    let images = await SpotImage.findAll({ where: { preview: true }, raw: true })
    for (let spot of spots) {
        let spotReviews = reviews.filter(review => review.spotId === spot.id);
        let total = spotReviews.reduce((sum, review) => sum += review.stars, 0)
        spot.avgRating = total / spotReviews.length;
        let imagePreview = images.filter(image => image.spotId === spot.id)[0]
        // let imagePreview = await SpotImage.findOne({
        //     where: {
        //         spotId: spot.id,
        //         preview: true
        //     }
        // })
        if (imagePreview) {
            spot.previewImage = imagePreview.url

        }

    }
    res.json(spots);
})

router.get('/current', requireAuth, async (req, res) => {
    let { user } = req;
    user = user.dataValues;
    let spots = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        raw: true
    })
    let reviews = await Review.findAll({
        attributes: {
            include: ['spotId', 'stars']
        },
        raw: true
    })

    let images = await SpotImage.findAll({ where: { preview: true }, raw: true })
    // console.log(images);
    for (let spot of spots) {
        let spotReviews = reviews.filter(review => review.spotId === spot.id);
        let total = spotReviews.reduce((sum, review) => sum += review.stars, 0)
        spot.avgRating = total / spotReviews.length;
        let imagePreview = images.filter(image => image.spotId === spot.id)[0]

        if (imagePreview) {

            spot.previewImage = imagePreview.url
        }
    }
    res.json(spots)
})

router.get('/:spotId', async (req, res) => {
    try {
        let spot = await Spot.findByPk(req.params.spotId, {
            include: [{ model: SpotImage, attributes: { exclude: ['createdAt', 'updatedAt', 'spotId'] } }, {
                model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName']

            }]
        })
        if (!spot) {
            throw new Error;
        }

        let reviews = await Review.findAll({
            attributes: {
                include: ['spotId', 'stars']
            },
            where: { spotId: req.params.spotId },
            raw: true
        })
        let numReviews = reviews.length;
        let total = reviews.reduce((sum, review) => sum += review.stars, 0)
        let avgStarRating = total / numReviews;

        spot.dataValues.numReviews = numReviews;
        spot.dataValues.avgStarRating = avgStarRating;

        res.json(spot)
    }
    catch (e) {
        res.status(404);
        res.json({ message: "Spot couldn't be found" })

    }

})

router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    let { user } = req;
    user = user.dataValues.id;
    let spot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId: user })
    res.status(201);
    res.json(spot);

})
router.post('/:spotId/images', requireAuth, async (req, res) => {
    try {
        let spot = await Spot.findByPk(req.params.spotId);
        const { url, preview } = req.body;
        let { user } = req;
        user = user.dataValues;
        if (!spot || spot.ownerId !== user.id) {
            throw new Error("Spot couldn't be found")
        }

        //uncomment below if we want specific error for different owner
        // if (spot.ownerId !== user.id) {
        //     throw new Error("Spot must belong to the current user.")
        // }

        let newImage = await spot.createSpotImage({ url, preview })
        res.json({ id: newImage.id, url: newImage.url, preview: newImage.preview })
    }
    catch (e) {
        res.status(404);
        res.json({ message: e.message })
    }
})

router.put('/:spotId', requireAuth, async (req, res) => {

    let spot = await Spot.findByPk(req.params.spotId);
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    let { user } = req;
    user = user.dataValues;
    if (!spot || spot.ownerId !== user.id) {
        // throw new Error("Spot couldn't be found")
        res.status(404);
        res.json({ message: "Spot couldn't be found" })
    }
    else {
        spot.address = address;
        spot.city = city;
        spot.state = state;
        spot.country = country;
        spot.lat = lat;
        spot.lng = lng;
        spot.name = name;
        spot.description = description;
        spot.price = price;
        await spot.save();
        res.json(spot)

    }

})
router.delete('/:spotId', async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);
    let { user } = req;
    user = user.dataValues;
    if (!spot || spot.ownerId !== user.id) {
        // throw new Error("Spot couldn't be found")
        res.status(404);
        res.json({ message: "Spot couldn't be found" })
    }
    else {
        await spot.destroy();
        res.json({ message: "Successfully deleted" })
    }
})

router.get('/:spotId/reviews', async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        res.json({ message: "Spot couldn't be found" })
    }
    else {
        let Reviews = await Review.findAll({
            where: {
                spotId: req.params.spotId
            },
            include: [User.scope('basic'), ReviewImage]
        })
        res.json({ Reviews })
    }
})

router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        res.json({ message: "Spot couldn't be found" })
    }
    const { review, stars } = req.body;
    let { user } = req;
    user = user.dataValues;
    let userId = user.id
    let reviews = await spot.getReviews({ where: { userId } })
    if (reviews.length) {
        res.status(403);
        return res.json({ message: "User already has a review for this spot" })
    }


    else {
        let newReview = await spot.createReview({ review, stars, userId });
        res.status(201);
        res.json(newReview);
    }

})

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }
    let { user } = req;
    user = user.dataValues;
    let userId = user.id
    let Bookings;

    if (userId === spot.dataValues.ownerId) {
        Bookings = await spot.getBookings({ include: { model: User.scope('basic') } });
    }
    else {
        Bookings = await spot.getBookings({ attributes: ['spotId', 'startDate', 'endDate'] })
    }

    res.json({ Bookings });

})
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);
    let spotId = spot.dataValues.id;
    let { user } = req;
    user = user.dataValues;
    let userId = user.id
    const { startDate: startString, endDate: endString } = req.body;
    let startDate = new Date(startString);
    let endDate = new Date(endString);
    if (!spot) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }
    if (userId === spot.dataValues.ownerId) {
        res.status(404);
        return res.json({ message: "Can not create booking if user is the owner of the spot" })
    }
    const { Op } = require("sequelize");
    let errors = {};
    let conflict = false;
    let allBookingsBefore = await spot.getBookings({
        where: {
            "endDate": {
                [Op.gte]: startDate
            },
            "startDate": {
                [Op.lte]: startDate
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

    let newBooking = await spot.createBooking({ userId, spotId, startDate, endDate })
    res.json(newBooking);


})
module.exports = router;

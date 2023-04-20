const express = require('express')
const router = express.Router();
const { Spot, Review, ReviewImage, SpotImage, User } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')
const { Op } = require("sequelize");



router.get('/', async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    let where = {}
    if (page) page = parseInt(page);
    if (!page) page = 1;

    if (size) size = parseInt(size);
    if (!size) size = 20;

    if (minLat !== undefined) {
        minLat = Number(minLat)
        where.lat = { [Op.gte]: minLat };
    };
    if (maxLat !== undefined) {
        maxLat = Number(maxLat)
        where.lat = { [Op.lte]: maxLat }
    };
    if (minLat !== undefined && maxLat !== undefined) {
        where.lat = { [Op.between]: [minLat, maxLat] }
    };

    if (minLng !== undefined) {
        minLng = Number(minLng)
        where.lng = { [Op.gte]: minLng }
    };
    if (maxLng !== undefined) {
        maxLng = Number(maxLng)
        where.lng = { [Op.lte]: maxLng }
    };
    if (minLng !== undefined && maxLng !== undefined) {
        where.lng = { [Op.between]: [minLng, maxLng] }
    }
    if (minPrice !== undefined) {
        minPrice = Number(minPrice)
        where.price = { [Op.gte]: minPrice };
    };
    if (maxPrice !== undefined) {
        maxPrice = Number(maxPrice)
        where.price = { [Op.lte]: maxPrice };
    };
    if ((minPrice !== undefined) && (maxPrice !== undefined)) {
        where.price = { [Op.between]: [minPrice, maxPrice] }
    }

    let limit = size;
    let offset = size * (page - 1)

    let Spots = await Spot.findAll({ where, limit, offset, raw: true });
    // if (minPrice < 0) minPrice = 0;
    // if (maxPrice < 0) maxPrice = 0;
    let errors = {}
    if (page < 1 || page > 10) errors.page = "Page must be greater than or equal to 1"
    if (size < 1 || size > 20) errors.size = "Size must be greater than or equal to 1"
    if (isNaN(maxLat) && maxLat !== undefined) errors.maxLat = "Maximum latitude is invalid"
    if (isNaN(minLat) && minLat !== undefined) errors.minLat = "Minimum latitude is invalid"
    if (isNaN(maxLng) && maxLng !== undefined) errors.maxLng = "Maximum longitude is invalid"
    if (isNaN(minLng) && minLng !== undefined) errors.minLng = "Minimum longitude is invalid"
    if (minPrice < 0) errors.minPrice = "Minimum price must be greater than or equal to 0"
    if (maxPrice < 0) errors.maxPrice = "Maximum price must be greater than or equal to 0"
    if (Object.keys(errors).length) {
        res.status(400);
        return res.json({ message: "Bad request", errors })
    }
    let reviews = await Review.findAll({
        attributes: {
            include: ['spotId', 'stars']
        },
        raw: true
    })
    let images = await SpotImage.findAll({ where: { preview: true }, raw: true })
    for (let spot of Spots) {
        let spotReviews = reviews.filter(review => review.spotId === spot.id);
        let total = spotReviews.reduce((sum, review) => sum += review.stars, 0)
        spot.avgRating = total / spotReviews.length;
        let imagePreview = images.filter(image => image.spotId === spot.id)[0]
        spot.previewImage = null;
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
    res.json({ Spots, page, size });
})

router.get('/current', requireAuth, async (req, res) => {
    let { user } = req;
    // user = user.toJSON();
    let Spots = await Spot.findAll({
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
    for (let spot of Spots) {
        let spotReviews = reviews.filter(review => review.spotId === spot.id);
        let total = spotReviews.reduce((sum, review) => sum += review.stars, 0)
        spot.avgRating = total / spotReviews.length;
        let imagePreview = images.filter(image => image.spotId === spot.id)[0]
        spot.previewImage = null;

        if (imagePreview) {

            spot.previewImage = imagePreview.url
        }
    }
    res.json({ Spots })
})

router.get('/:spotId', async (req, res) => {
    try {
        let spot = await Spot.findByPk(req.params.spotId, {
            include: [{ model: SpotImage, attributes: { exclude: ['createdAt', 'updatedAt', 'spotId'] } }, {
                model: User, as: 'Owner', attributes: ['id', 'firstName', 'lastName']

            }]
        })
        spot = spot.toJSON()
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

        spot.numReviews = numReviews;
        spot.avgStarRating = avgStarRating;

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
    user = user.id;
    let spot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId: user })
    res.status(201);
    res.json(spot);

})
router.post('/:spotId/images', requireAuth, async (req, res) => {
    try {
        let spot = await Spot.findByPk(req.params.spotId);
        const { url, preview } = req.body;
        let { user } = req;
        // user = user.toJSON()
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
    // const { address, city, state, country, lat, lng, name, description, price } = req.body;
    let { user } = req;
    // user = user.toJSON();
    if (!spot || spot.ownerId !== user.id) {
        // throw new Error("Spot couldn't be found")
        res.status(404);
        return res.json({ message: "Spot couldn't be found" })
    }
    // else {
    //     spot.address = address;
    //     spot.city = city;
    //     spot.state = state;
    //     spot.country = country;
    //     spot.lat = lat;
    //     spot.lng = lng;
    //     spot.name = name;
    //     spot.description = description;
    //     spot.price = price;
    //     await spot.save();
    //     res.json(spot)

    // }
    await spot.update(req.body);
    res.json(spot);

})
router.delete('/:spotId', async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);
    let { user } = req;
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
    let userId = user.id
    let reviews = await spot.getReviews({ where: { userId } })
    if (reviews.length) {
        res.status(500);
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
    let spotJson = spot.toJSON()
    let { user } = req;
    // user = user.toJSON();
    let userId = user.id
    let Bookings;

    if (userId === spotJson.ownerId) {
        Bookings = await spot.getBookings({ include: { model: User.scope('basic') } });
    }
    else {
        Bookings = await spot.getBookings({ attributes: ['spotId', 'startDate', 'endDate'] })
    }

    for (let booking of Bookings) {
        booking.dataValues.startDate = booking.startDate.toISOString().slice(0, 10)
        booking.dataValues.endDate = booking.endDate.toISOString().slice(0, 10)
    }

    res.json({ Bookings });

})
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }
    let spotId = spot.id;
    let { user } = req;
    // user = user.toJSON();
    let userId = user.id
    const { startDate: startString, endDate: endString } = req.body;
    let startDate = new Date(startString);
    let endDate = new Date(endString);
    if (userId === spot.toJSON().ownerId) {
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
    newBooking.dataValues.startDate = newBooking.startDate.toISOString().slice(0, 10)
    newBooking.dataValues.endDate = newBooking.endDate.toISOString().slice(0, 10)
    res.json(newBooking);


})
module.exports = router;

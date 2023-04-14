const express = require('express')
const router = express.Router();
const { Spot, Review, SpotImage } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')


router.get('/', async (req, res) => {
    let spots = await Spot.findAll({ raw: true });

    let reviews = await Review.findAll({
        attributes: {
            include: ['spotId', 'stars']
        },
        raw: true
    })
    for (let spot of spots) {
        let spotReviews = reviews.filter(review => review.spotId === spot.id);
        let total = spotReviews.reduce((sum, review) => sum += review.stars, 0)
        spot.avgRating = total / spotReviews.length;

        let imagePreview = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        })
        spot.previewImage = imagePreview.url

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

    for (let spot of spots) {
        let spotReviews = reviews.filter(review => review.spotId === spot.id);
        let total = spotReviews.reduce((sum, review) => sum += review.stars, 0)
        spot.avgRating = total / spotReviews.length;
        let imagePreview = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        })
        spot.previewImage = imagePreview.url
    }
    res.json(spots)
})

module.exports = router;
const express = require('express')
const router = express.Router();
const { Review, SpotImage, ReviewImage, Spot, User } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')

router.get('/current', requireAuth, async (req, res) => {
    let { user } = req;
    user = user.dataValues;

    let Reviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: Spot, attributes: { exclude: ['description', 'createdAt', 'updatedAt'] } },
            ReviewImage]
    })


    for (let review of Reviews) {
        let spot = review.dataValues.Spot.dataValues;
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
    res.json({ Reviews });
})




module.exports = router;

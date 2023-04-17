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

router.post('/:reviewId/images', requireAuth, async (req, res) => {

    let { user } = req;
    let { url } = req.body;
    user = user.dataValues;
    let review = await Review.findByPk(req.params.reviewId);

    if (!review || review.dataValues.userId !== user.id) {
        res.status(404);
        return res.json({ message: "Review couldn't be found" })
    }
    // let count = await review.getReviewImages({ raw: true });
    let count = await ReviewImage.count({ where: { reviewId: req.params.reviewId } })
    if (count > 10) {
        res.status(403);
        return res.json({ message: "Maximum number of images for this resource was reached" })
    }
    let newImage = await review.createReviewImage({ url });
    res.json({ id: newImage.id, url: newImage.url });

})

router.put('/:reviewId', requireAuth, async (req, res) => {
    let { user } = req;
    const { review, stars } = req.body;
    user = user.dataValues;
    let reviewRecord = await Review.findByPk(req.params.reviewId);
    if (!reviewRecord || reviewRecord.dataValues.userId !== user.id) {
        res.status(404);
        return res.json({ message: "Review couldn't be found" })
    }
    reviewRecord.review = review;
    reviewRecord.stars = stars;
    await reviewRecord.save();
    res.json(reviewRecord);
})

router.delete('/:reviewId', requireAuth, async (req, res) => {
    let { user } = req;
    user = user.dataValues;
    let reviewRecord = await Review.findByPk(req.params.reviewId);
    if (!reviewRecord || reviewRecord.dataValues.userId !== user.id) {
        res.status(404);
        return res.json({ message: "Review couldn't be found" })
    }
    await reviewRecord.destroy();
    res.json({ message: "Successfully deleted" })
})


module.exports = router;

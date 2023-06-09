const express = require('express')
const router = express.Router();
const { Review, SpotImage, ReviewImage, Spot, User } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')

router.get('/current', requireAuth, async (req, res) => {
    let { user } = req;
    // user = user.toJSON();

    let Reviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: Spot, attributes: { exclude: ['description', 'createdAt', 'updatedAt'] } },
            ReviewImage],
        // raw: true,
        // nest: true
    })


    for (let review of Reviews) {
        // review = review.toJSON()
        let spot = review.Spot.dataValues
        let imagePreview = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        });
        spot.previewImage = null;
        if (imagePreview) {
            spot.previewImage = imagePreview.url

        }
    }
    res.json({ Reviews });
})

router.post('/:reviewId/images', requireAuth, async (req, res) => {

    let { user } = req;
    let { url } = req.body;
    // user = user.toJSON();
    let review = await Review.findByPk(req.params.reviewId);
    // let reviewJSON = review.toJSON()

    if (!review || review.userId !== user.id) {
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
    // user = user.toJSON();
    let reviewRecord = await Review.findByPk(req.params.reviewId);
    // let reviewUser = reviewRecord.toJSON().userId
    if (!reviewRecord || reviewRecord.userId !== user.id) {
        res.status(404);
        return res.json({ message: "Review couldn't be found" })
    }
    if (review) {

        reviewRecord.review = review;
    }
    if (stars) {

        reviewRecord.stars = stars;
    }
    await reviewRecord.save();
    res.json(reviewRecord);
})

router.delete('/:reviewId', requireAuth, async (req, res) => {
    let { user } = req;
    // user = user.toJSON();
    let reviewRecord = await Review.findByPk(req.params.reviewId);
    // let reviewUser = reviewRecord.toJSON().userId
    if (!reviewRecord || reviewRecord.userId !== user.id) {
        res.status(404);
        return res.json({ message: "Review couldn't be found" })
    }
    await reviewRecord.destroy();
    res.json({ message: "Successfully deleted" })
})


module.exports = router;

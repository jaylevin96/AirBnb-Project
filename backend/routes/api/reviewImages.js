const express = require('express')
const router = express.Router();
const { Spot, Review, ReviewImage, SpotImage, User } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')


router.delete('/:imageId', requireAuth, async (req, res) => {
    let image = await ReviewImage.unscoped().findByPk(req.params.imageId);
    if (!image) {
        res.status(404);
        return res.json({ message: "Review Image couldn't be found" })
    }
    let review = await Review.findByPk(image.reviewId);
    let { user } = req;
    user = user.toJSON()
    if (review.userId !== user.id) {
        res.status(404);
        return res.json({ message: "Review Image couldn't be found" })
    }

    await image.destroy();
    res.json({ message: "Successfully deleted" })
})

module.exports = router;

const express = require('express')
const router = express.Router();
const { Spot, Review, ReviewImage, SpotImage, User } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')

router.delete('/:imageId', requireAuth, async (req, res) => {
    let image = await SpotImage.findByPk(req.params.imageId);
    if (!image) {
        res.status(404);
        return res.json({ message: "Spot Image couldn't be found" })
    }
    let spot = await Spot.findByPk(image.spotId)
    let { user } = req;
    // user = user.toJSON()
    if (spot.ownerId !== user.id) {
        res.status(404);
        return res.json({ message: "Spot Image couldn't be found" })
    }

    await image.destroy();
    return res.json({ message: "Successfully deleted" })
})
module.exports = router;

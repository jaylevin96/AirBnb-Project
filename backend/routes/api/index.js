const router = require('express').Router();


const { restoreUser } = require('../../utils/auth.js')
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')
const spotsRouter = require('./spots')
// const { requireAuth } = require('../../utils/auth.js')
// const { setTokenCookie } = require('../../utils/auth.js')
// const { User } = require('../../db/models')


router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter)
router.use('/spots', spotsRouter)
router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});
// router.get('/restore-user', (req, res) => {
//     return res.json(req.user)
// })

// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user);
// })

// router.get('/set-token-cookie', async (req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user: user })
// })




module.exports = router;

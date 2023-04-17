const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];
router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    let errors = {};
    let existError = false;
    let findEmail = await User.findOne({ where: { email } })
    if (findEmail) {
        errors.email = "User with that email already exists";
        existError = true
    }
    let findUsername = await User.findOne({ where: { username } })
    if (findUsername) {
        existError = true
        errors.username = "User with that username already exists";
    }

    if (existError) {
        res.status(500);
        return res.json({ message: "User already exists", errors })
    }

    const user = await User.create({ firstName, lastName, email, password, username, hashedPassword })



    let safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
    }
    const token = setTokenCookie(res, safeUser);
    safeUser.token = token;
    return res.json({
        user: safeUser
    })
})

module.exports = router;

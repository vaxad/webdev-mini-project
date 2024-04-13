const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET;

//ROUTE 1: create a user using: POST '/auth/signup'
router.post('/signup', [
    body('email', 'Enter a valid email').isEmail(),
    body('username', 'Enter a valid name').isString(),
    body('password', 'Password must have at least one digit, one lowercase and one uppercase letter, and be at least 6 characters long').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        const user2 = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(200).json({ error: 'A user with this email already exists!' });
        }else if (user2) {
            return res.status(200).json({ error: 'A user with this username already exists!' });
        }else{
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        const createdUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            genre: req.body.genre,
            rank: req.body.rank,
            interestedGames: req.body.interestedGames,  
        })
        const data = {
            user: {
                id: createdUser.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.status(200).json({ authToken });
    }
    } catch (error) {
        return res.status(500).json({ error });
    }
})

//ROUTE 2: login a user using: POST '/auth/login'
router.post('/login', [
    body('username', 'Enter a valid username').exists(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(200).json({ error: "User does not exists" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(200).json({ error: "Please login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        return res.status(200).json({ authToken });
    } catch (error) {
        return res.status(500).json({ error });
    }
})

//ROUTE 3: get a user using: GET '/auth/getuser'
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error });
    }
})

module.exports = router;
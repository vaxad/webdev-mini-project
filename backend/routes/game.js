const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');

router.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.term; 
        const games = await Game.find({ name: { $regex: new RegExp(searchTerm, 'i') } }).limit(10);
        return res.json(games).status(200);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/my', fetchuser,async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({error: "User not found"});
        return res.json(user.interestedGames).status(200);
    } catch (error) {
        
    }
})

module.exports = router;

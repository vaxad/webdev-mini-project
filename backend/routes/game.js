const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const fetchuser = require('../middleware/fetchuser');

router.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.term; 
        const games = await Game.find({ name: { $regex: new RegExp(searchTerm, 'i') } });
        res.json(games).status(200);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/my', fetchuser,async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const games = await Game.find({ id: { $in: user.interestedGames } });
        games.forEach(element => {
            
        });
        
    } catch (error) {
        
    }
})

module.exports = router;

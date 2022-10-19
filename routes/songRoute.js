const express = require('express');
const router = express.Router();
const Song = require('../models/songModel');
const authMiddleware = require('../middlewares/authMiddleware');


router.post("/get-all-songs", authMiddleware, async (req, res) => {
    try{
        const songs = await Song.find();
        return res.status(200).send({message: "Songs fetched successfully", success: true, data: songs})
    }catch (err) {
        return res.status(500).send({message: 'Error fetching songs', success: false, data: err});
    }
})

module.exports = router;
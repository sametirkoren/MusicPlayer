const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
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


router.post("/add-playlist", authMiddleware, async (req, res) => {
    try{
        const user = await User.findById(req.body.userId);
        const existingPlaylists = user.playlists;
        existingPlaylists.push({
            name: req.body.name,
            songs: req.body.songs,
        });
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
            playlists: existingPlaylists,
        }, {new: true});
        return res.status(200).send({message: "Playlist created successfully", success: true, data: updatedUser})
    }catch (err) {
        return res.status(500).send({message: 'Error creating playlist', success: false, data: err});
    }
})

router.post("/update-playlist", authMiddleware, async (req, res) => {
    try{
        const user = await User.findById(req.body.userId);
        let existingPlaylists = user.playlists;
        existingPlaylists = existingPlaylists.map((playlist) => {
            if(playlist.name === req.body.name){
                playlist.songs = req.body.songs;
            }
            return playlist;
        })
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
            playlists: existingPlaylists,
        }, {new: true});
        return res.status(200).send({message: "Playlist updated successfully", success: true, data: updatedUser})
    }catch (err) {
        return res.status(500).send({message: 'Error updating playlist', success: false, data: err});
    }
})

router.post("/delete-playlist", authMiddleware, async (req, res) => {
    try{
        const user = await User.findById(req.body.userId);
        let existingPlaylists = user.playlists;
        existingPlaylists = existingPlaylists.filter((playlist) => {
            if(playlist.name === req.body.name){
                return false;
            }
            return true;
        })
        const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
            playlists: existingPlaylists,
        }, {new: true});
        return res.status(200).send({message: "Playlist deleted successfully", success: true, data: updatedUser})
    }catch (err) {
        return res.status(500).send({message: 'Error updating playlist', success: false, data: err});
    }
})

module.exports = router;
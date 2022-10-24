const express = require('express')
const router = express.Router()
const multer = require('multer')
const authMiddleware = require('../middlewares/authMiddleware');
const {cloudinary} = require('../cloudinary');
const Song = require('../models/songModel');


const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/')
    },
    filename: function (req,file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

router.post("/add-song", authMiddleware, upload.single('file') ,async (req, res) => {
    try{
        cloudinary.v2.uploader.upload(req.file.path, {folder: "songs", use_filename: true, unique_filename: true, resource_type: 'raw'},
            async (err, result) => {
            if(err) {
                console.log(err);
                res.status(500).json({message: "Something went wrong uploading"})
            }else{
                const newSong = new Song({
                    title: req.body.title,
                    artist: req.body.artist,
                    src: result.url,
                    album: req.body.album,
                    duration: req.body.duration,
                    year: req.body.year
                })
                await newSong.save();
                const allSongs = await Song.find()
                res.status(200).send({
                    message: 'Song added successfully',
                    success: true,
                    data: allSongs,
                })
            }
        })

    }catch(err){
        res.status(500).send({
            message: "Error adding song",
            success: false,
            data: err
        })
    }
})


router.post("/edit-song", authMiddleware, upload.single('file') ,async (req, res) => {
    try{
        let response = null;
        if (req.file){
            response = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "songs",
                use_filename: true,
                resource_type: 'raw'
            });
        }
        await Song.findByIdAndUpdate(req.body._id, {
            title: req.body.title,
            artist: req.body.artist,
            src: response ? response.url : req.body.src,
            album: req.body.album,
            duration: req.body.duration,
            year: req.body.year,
        });

        const allSongs = await Song.find()
        res.status(200).send({
            message: 'Song edited successfully',
            success: true,
            data: allSongs,
        })

    }catch(err){
        res.status(500).send({
            message: "Error edited song",
            success: false,
            data: err
        })
    }
})


module.exports = router;

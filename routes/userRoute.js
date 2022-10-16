const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', async (req, res) => {
    try {

        const password = req.body.password
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        req.body.password = hashedPassword;
        const user = new User(req.body);
        const existingUser = await User.findOne({email: req.body.email});
        if(existingUser)
            return res.status(403).send({message: 'User already registered', success: false});
        else{
            await user.save();
            return res.status(200).send({message: 'User registered successfully', success: true});
        }
    } catch (err) {
        return res.status(500).send({message: err.message, success: false});
    }
})

router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res
                .status(404)
                .send({message: 'User not found', success: false})
        }
        const passwordsMatched = await bcrypt.compareSync(req.body.password, user.password)
        if(passwordsMatched){
            const token = jwt.sign({ userId: user._id}, process.env.SECRET_KEY,{
                expiresIn: "1h"
            });
            return res
                .status(200).send({message: "User logged in successfully", success: true, data:token})


        }else{
            return res
                .status(401)
                .send({message: "Password in incorrect", success: false})
        }
    }
    catch (err) {
        return res.status(500).send({message: err.message, success: false});
    }
})

router.post("/get-user-data", authMiddleware, async (req, res) => {
    try{
        const user = await User.findById(req.body.userId);
        user.password = undefined;
        return res.status(200).send({message: "User data fetched successfully", success: true, data:user})

    }catch (err) {
        return res.status(500).send({message: err.message, success: false});
    }
})

module.exports = router;
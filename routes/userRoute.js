const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

router.post('/register', async (req, res) => {
    try {

        const password = req.body.password
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        req.body.password = hashedPassword;
        const user = new User(req.body);
        const existingUser = await User.findOne({email: req.body.email});
        if(existingUser)
            return res.status(200).send({message: 'User already registered', success: false});
        else{
            await user.save();
            return res.status(200).send({message: 'User registered successfully', success: true});
        }


    } catch (err) {
        return res.status(500).send({message: err.message, success: false});

    }
})

module.exports = router;
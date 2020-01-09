const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({token});
    } catch (error) {
        res.status(422).send({error: 'This username has been already taken'});
    }
});

router.post('/users/login', async(req, res) => {
    const { username, password } = req.body;
    //Login a registered user
    try {
        const user = await User.findByCredentials(username, password);
        if (!user) {
            return res.status(422).send({error: 'Login failed! Check authentication credentials'});
        }
        const token = await user.generateAuthToken();
        res.send({token});
    } catch (e) {
        res.status(422).send({error: 'Login failed! Check authentication credentials'});
    }

});

module.exports = router;
const express = require('express');
const auth = require('../middleware/auth');
const Folder = require('../models/folder');

const router = express.Router();

router.post('/folders', auth, async (req, res) => {
    // Create a new folder
    try {
        const folder = new Folder(req.body);
        await folder.save();
        res.status(201).send({ folder });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/folders', auth, async (req, res) => {
    // Get all folders
    try {
        const folders = await Folder.find({});
        res.status(200).send(folders);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/folders/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const folder = await Folder.renameById(id, name);
        res.status(200).send(folder);
        
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
        
    }
});

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTA1ZWUzNjYwY2E2ODZlNDdmOWM1YzciLCJpYXQiOjE1Nzc0NDgyNzJ9.5CsgMsBQBv7zwObJORtPejH8TL_RNghx5o5L024h3mI

// router.post('/users', async (req, res) => {
//     // Create a new user
//     try {
//         const user = new User(req.body);
//         await user.save();
//         const token = await user.generateAuthToken();
//         res.status(201).send({token});
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// router.post('/users/login', async(req, res) => {
//     //Login a registered user
//     try {
//         const { username, password } = req.body;
//         const user = await User.findByCredentials(username, password);
//         if (!user) {
//             return res.status(401).send({error: 'Login failed! Check authentication credentials'});
//         }
//         const token = await user.generateAuthToken();
//         res.send({token});
//     } catch (error) {
//         res.status(400).send(error);
//     }

// });

module.exports = router;
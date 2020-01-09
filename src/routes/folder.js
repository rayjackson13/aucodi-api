const express = require('express');
const auth = require('../middleware/auth');
const Folder = require('../models/folder');

const router = express.Router();

router.post('/folders', auth, async (req, res) => {
    // Create a new folder
    const user = req.user;
    const owner_id = user._id;
    try {
        const folder = new Folder({ ...req.body, owner_id });
        await folder.save();
        res.status(201).send({ folder });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/folders', auth, async (req, res) => {
    // Get all folders
    const user = req.user;
    const owner_id = user._id;
    try {
        const folders = await Folder.find({ owner_id });
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
        res.status(404).send(error);
        
    }
});

router.delete('/folders/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        await Folder.deleteById(id);
        res.status(200);
    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = router;
const express = require('express');
const auth = require('../middleware/auth');
const Media = require('../models/media');

const router = express.Router();

router.post('/media', auth, async (req, res) => {
    // Create a new media
    console.log(req.body, req.files);
    const user = req.user;
    const owner_id = user._id;
    try {
        const media = new Media({ ...req.fields, ...req.files, owner_id });
        await media.save();
        res.status(201).send({ media });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/media', auth, async (req, res) => {
    // Get all folders
    const user = req.user;
    const owner_id = user._id;
    try {
        const folders = await Media.find({ owner_id });
        res.status(200).send(folders);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/media/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const media = await Media.renameById(id, name);
        res.status(200).send(media);
        
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
        
    }
});

router.delete('/media/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        await Media.deleteById(id);
        res.status(200);
    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = router;
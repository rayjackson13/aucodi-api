const path = require('path');
const express = require('express');
const auth = require('../middleware/auth');
const form = require('../middleware/form');
const Media = require('../models/media');
const formidable = require('express-formidable');

const router = express.Router();

router.use('/media', (req, res, next) => formidable({
    encoding: 'utf-8',
    multiples: false,
    keepExtensions: true,
    uploadDir: path.join(__dirname, '../static/uploads')
})(req, res, next));

router.post('/media', auth, async (req, res) => {
    // Create a new media
    const { files, fields, user } = req;
    const { file } = files;
    const { name, folder_id } = fields;
    const owner_id = user._id;
    try {
        const media = new Media({ 
            name, 
            folder_id, 
            file, 
            owner_id
        });
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
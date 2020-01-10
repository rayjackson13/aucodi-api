const path = require('path');
const formidable = require('express-formidable');
const authMiddleware = require('./auth');

const form = async(req, res, next) => {
    const formid = formidable({
        encoding: 'utf-8',
        multiples: false,
        keepExtensions: true,
        uploadDir: path.join(__dirname, '../static/uploads')
    })(req, res, next);
    console.log('form', formid);
    next();
};

module.exports = form;
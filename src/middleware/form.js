const path = require('path');
const formidable = require('express-formidable');

const form = async(req, res, next) => {
    console.log('form');
    formidable({
        encoding: 'utf-8',
        multiples: false,
        keepExtensions: true,
        uploadDir: path.join(__dirname, '../static/uploads')
    })(req, res, next);
    next();
};

module.exports = form;
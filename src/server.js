require('dotenv').config();
const path = require('path');
const express = require('express');
const parser = require('body-parser');
const formidableMiddleware = require('express-formidable');
require('./config/database');
const routes = require('./routes');

const app = express();
const port = 1700;

app.use(formidableMiddleware({
    encoding: 'utf-8',
    multiples: false,
    keepExtensions: true,
    uploadDir: path.join(__dirname, './static/uploads')
}));
app.use(parser.json());
routes(app);
app.listen(port, () => {
    console.log('We are live on port ' + port);
});

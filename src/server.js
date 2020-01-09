require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require('express');
const parser = require('body-parser');
const formidableMiddleware = require('express-formidable');
require('./config/database');
const routes = require('./routes');

const app = express();
const port = 1700;

app.use(cors());

// app.use(formidableMiddleware({
//     encoding: 'utf-8',
//     multiples: false,
//     keepExtensions: true,
//     uploadDir: path.join(__dirname, './static/uploads')
// }));
app.use(parser.json());
routes(app);
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });
app.listen(port, () => {
    console.info('We are live on port ' + port);
});

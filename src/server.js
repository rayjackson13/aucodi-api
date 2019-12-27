require('dotenv').config();
const express = require('express');
require('./config/database');
const routes = require('./routes');

const app = express();
const port = 1700;

app.use(express.json());
routes(app);
app.listen(port, () => {
    console.log('We are live on port ' + port);
});

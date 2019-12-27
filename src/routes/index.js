const auth = require('./auth');
const folder = require('./folder');

module.exports = (app) => {
    app.use(auth);
    app.use(folder);
};
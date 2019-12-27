const auth = require('./auth');
const folder = require('./folder');
const media = require('./media');

module.exports = (app) => {
    app.use(auth);
    app.use(folder);
    app.use(media);
};
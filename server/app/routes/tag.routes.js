module.exports = app => {
    const tags = require('../controller/tag.controller');
    const router = require('express').Router();

    router.get('/', tags.findAll);

    app.use('/api/tags', router);
};

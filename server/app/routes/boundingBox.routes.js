module.exports = app => {
    const boundingBoxes = require('../controller/boundingBox.controller');
    const router = require('express').Router();

    router.post('/', boundingBoxes.create);
    router.get('/', boundingBoxes.findAll);
    router.put('/:id', boundingBoxes.update);
    router.delete('/:id', boundingBoxes.delete);

    app.use('/api/boundingBoxes', router);
};

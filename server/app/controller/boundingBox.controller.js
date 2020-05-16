const db = require('../model');
const Tag = db.tag;
const BoundingBox = db.boundingBox;

exports.create = (req, res) => {
    if (!req.body.top || !req.body.left || !req.body.width || !req.body.height) {
        res.status(400).send({
            message: 'The top, left, width and height properties cannot be empty',
        });
        return;
    }

    // TODO: Duplicated
    let updatedTags = [];

    req.body.tags.forEach(tag => {
        Tag.findByPk(tag.id)
        .then(existingTag => {
            // If no existing tag
            let updatedTag;
            if (!existingTag) {
                // Create new tag
                Tag.create({ label: tag.label })
                .then(data => {
                    updatedTag = data;
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || 'Error while creating tag',
                    });
                });
            } else {
                updatedTag = existingTag;
            }

            updatedTags.push(updatedTag);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Error while fetching tag',
            });
        });
    });

    const boundingBox = {
        top: req.body.top,
        left: req.body.left,
        width: req.body.width,
        height: req.body.height,
        tags: updatedTags,
    };

    BoundingBox.create(boundingBox)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error while creating bounding box' });
        });
};

exports.findAll = (req, res) => {
    BoundingBox.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error while fetching bounding boxes' });
        });
};

exports.update = (req, res) => {
    let updatedTags = [];

    req.body.tags.forEach(tag => {
        Tag.findByPk(tag.id)
            .then(existingTag => {
                // If no existing tag
                let updatedTag;
                if (!existingTag) {
                    // Create new tag
                    Tag.create({ label: tag.label })
                        .then(data => {
                            updatedTag = data;
                        })
                        .catch(err => {
                            res.status(500).send({
                                message: err.message || 'Error while creating tag',
                            });
                        });
                } else {
                    updatedTag = existingTag;
                }

                updatedTags.push(updatedTag);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Error while fetching tag',
                });
            });
    });

    BoundingBox.findByPk(req.params.id)
        .then(boundingBox => {
            if (!boundingBox) {
                res.status(404).send({ message: 'Bounding Box not found' });
                return;
            }

            boundingBox.update({
                top: req.body.top,
                left: req.body.left,
                width: req.body.width,
                height: req.body.height,
                tags: updatedTags,
            })

            res.send(boundingBox);
        })
        .catch(err => {
            res.status(404).send({
                message: err.message || 'Bounding box not found',
            });
        })
};

exports.delete = (req, res) => {
    const id = req.params.id;

    BoundingBox.destroy({ where: { id } })
        .then(numDeleted => {
            if (numDeleted === 1) {
                res.send({ message: 'Bounding box successfully deleted' });
            } else {
                res.send({ message: `Could not delete bounding box with id ${id}` })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Could not delete bounding box with id ${id}`,
            });
        })
};

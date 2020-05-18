const db = require('../model');
const Tag = db.tag;
const BoundingBox = db.boundingBox;

const getUpdatedTags = (req) => {
    return db.sequelize.transaction(transaction => {
        return Promise.all(req.body.tags.map(tag => {
            return Tag.findOrCreate({ where: { label: tag.label }, transaction });
        }));
    });
}

exports.create = async (req, res) => {
    if (!req.body.top || !req.body.left || !req.body.width || !req.body.height) {
        res.status(400).send({
            message: 'The top, left, width and height properties cannot be empty',
        });
        return;
    }

    const updatedTags = await getUpdatedTags(req);

    const boundingBox = {
        top: req.body.top,
        left: req.body.left,
        width: req.body.width,
        height: req.body.height,
    };

    BoundingBox.create(boundingBox)
        .then(data => {
            data.setTags(updatedTags.map(tag => tag[0]));
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error while creating bounding box' });
        });
};

exports.findAll = (req, res) => {
    BoundingBox.findAll({ include: { model: Tag, as: 'tags' } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error while fetching bounding boxes' });
        });
};

exports.update = async (req, res) => {
    const updatedTags = await getUpdatedTags(req);

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
            });

            boundingBox.setTags(updatedTags.map(tag => tag[0]));

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

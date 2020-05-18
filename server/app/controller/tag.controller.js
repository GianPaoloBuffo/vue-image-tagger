const db = require('../model');
const Tag = db.tag;

exports.findAll = (req, res) => {
    Tag.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error while fetching tags' });
        });
};

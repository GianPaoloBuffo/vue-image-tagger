const db = require('../model');
const Tag = db.tag;

// exports.create = (req, res) => {
//     if (!req.body.label) {
//         res.status(400).send({ message: 'Label cannot be empty' });
//         return;
//     }
//
//     const tag = {
//         label: req.body.label,
//     };
//
//     Tag.create(tag)
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//            res.status(500).send({ message: err.message || 'Error while creating tag' });
//         });
// };

exports.findAll = (req, res) => {
    Tag.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error while fetching tags' });
        });
};

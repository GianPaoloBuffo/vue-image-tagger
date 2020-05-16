const config = require('../config/db.config');

const { Sequelize } = require('sequelize');

// TODO: This might be enough, then don't need config
const sequelize = new Sequelize(config.DB.PROVIDER)

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tag = require('./tag.model')(sequelize, Sequelize);
db.boundingBox = require('./boundingBox.model')(sequelize, Sequelize);

db.tag.belongsToMany(db.boundingBox, {
    through: 'boundingBox_tag',
    as: 'boundingBoxes',
    foreignKey: 'tag_id',
});
db.boundingBox.belongsToMany(db.tag, {
    through: 'boundingBox_tag',
    as: 'tags',
    foreignKey: 'boundingBox_id',
});

module.exports = db;

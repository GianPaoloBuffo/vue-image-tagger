module.exports = (sequelize, DataTypes) => {
    return sequelize.define('boundingBox', {
        top: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        left: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        width: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        height: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
    });
};

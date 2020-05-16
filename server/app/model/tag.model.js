module.exports = (sequelize, DataTypes) => {
    return sequelize.define('tag', {
        label: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    });
};

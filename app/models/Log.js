const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Log', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ip: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'log',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

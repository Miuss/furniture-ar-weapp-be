const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Furniture', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "家具名称"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "家具介绍"
    },
    coverUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "家具封面图片Url"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "家具介绍"
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "家具售价"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "家具提交用户Id"
    }
  }, {
    sequelize,
    tableName: 'furniture',
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

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Material', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    furnitureId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "家具绑定Id"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "家具材质名称"
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "家具材质介绍"
    },
    modelUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "家具材质模型Url"
    },
    md5: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "家具材质模型文件的md5"
    },
    modelScale: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "家具材质模型缩放大小"
    },
    modelArScale: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    modelY: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "家具材质发布用户Id"
    }
  }, {
    sequelize,
    tableName: 'material',
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

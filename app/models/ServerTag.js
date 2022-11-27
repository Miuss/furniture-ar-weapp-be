const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ServerTag', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "服务器标签Id"
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "服务器标签名称"
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "服务器标签简介"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "创建服务器标签的用户Id"
    }
  }, {
    sequelize,
    tableName: 'server_tag',
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

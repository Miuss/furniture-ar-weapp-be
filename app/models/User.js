const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户名"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户密码"
    },
    salt: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户密码加密盐值"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户邮箱"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "用户简介"
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "用户token"
    }
  }, {
    sequelize,
    tableName: 'user',
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

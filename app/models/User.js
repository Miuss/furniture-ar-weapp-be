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
    avatarUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "用户头像"
    },
    coverUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "用户主页封面图"
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
    },
    roles: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "用户角色"
    },
    ip: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "用户最近登录的ip地址"
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "用户上一次登录时间"
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

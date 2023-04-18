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
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "用户简介"
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
    openId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户微信小程序账号openid"
    },
    sessionKey: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "微信小程序sessionKey"
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
    },
    adminKey: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "管理员扫码登录后台key"
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

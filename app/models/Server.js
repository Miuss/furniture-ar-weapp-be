const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Server', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "服务器名称"
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "服务器简介"
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "服务器创建用户id"
    },
    server_ip: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "服务器IP地址"
    },
    server_port: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "服务器端口"
    },
    server_type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "服务器类型（java、pe）"
    },
    server_max_player: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "服务器最大可在线玩家数"
    },
    server_online_player: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "服务器在线玩家数"
    },
    server_ping: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "服务器延迟"
    },
    server_version: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "服务器版本号"
    },
    server_status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "服务器状态"
    },
    server_country: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "服务器所在国家"
    },
    server_offline_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "服务器离线次数（5分钟一次）"
    }
  }, {
    sequelize,
    tableName: 'Server',
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

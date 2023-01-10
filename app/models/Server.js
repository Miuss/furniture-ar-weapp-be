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
      allowNull: false,
      comment: "服务器名称"
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "服务器简介"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "服务器创建用户id"
    },
    serverIp: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "服务器IP地址",
      field: 'server_ip'
    },
    serverPort: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "服务器端口",
      field: 'server_port'
    },
    serverType: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "服务器类型（java、pe）",
      field: 'server_type'
    },
    serverMaxPlayer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "服务器最大可在线玩家数",
      field: 'server_max_player'
    },
    serverOnlinePlayer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "服务器在线玩家数",
      field: 'server_online_player'
    },
    serverIcon: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "服务器图标",
      field: 'server_icon'
    },
    serverWebsite: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "服务器官方网站",
      field: 'server_website'
    },
    serverQqGroup: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "服务器QQ群",
      field: 'server_qq_group'
    },
    serverVideoBili: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "服务器B站宣传视频",
      field: 'server_video_bili'
    },
    serverPing: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "服务器延迟",
      field: 'server_ping'
    },
    serverVersion: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "服务器版本号",
      field: 'server_version'
    },
    serverStatus: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "服务器状态",
      field: 'server_status'
    },
    serverCountry: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "服务器所在国家",
      field: 'server_country'
    },
    serverPositionLon: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "服务器地图经度",
      field: 'server_position_lon'
    },
    serverPositionLat: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "服务器地址纬度",
      field: 'server_position_lat'
    },
    serverOfflineCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "服务器离线次数（5分钟一次）",
      field: 'server_offline_count'
    }
  }, {
    sequelize,
    tableName: 'server',
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

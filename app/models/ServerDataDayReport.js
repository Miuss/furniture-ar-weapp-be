const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ServerDataDayReport', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    avgPlayerOnline: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "平均在线玩家数\n",
      field: 'avg_player_online'
    },
    maxPlayerOnline: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "最大在线玩家数\n",
      field: 'max_player_online'
    },
    minPlayerOnline: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "最小在线玩家数",
      field: 'min_player_online'
    },
    avgServerOnline: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "平均在线服务器数",
      field: 'avg_server_online'
    },
    maxServerOnline: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "最大在线服务器数",
      field: 'max_server_online'
    },
    minServerOnline: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "最小在线服务器数",
      field: 'min_server_online'
    },
    maxPlayerTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "最大在线玩家时间",
      field: 'max_player_time'
    },
    minPlayerTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "最小在线玩家时间",
      field: 'min_player_time'
    },
    maxServerTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "最大在线服务器数时间",
      field: 'max_server_time'
    },
    minServerTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "最小在线服务器数时间\n",
      field: 'min_server_time'
    },
    dayDate: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "报表数据日期",
      field: 'day_date'
    }
  }, {
    sequelize,
    tableName: 'server_data_day_report',
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

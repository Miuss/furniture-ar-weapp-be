const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ServerData', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "服务器id"
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "服务器状态"
    },
    online: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "服务器在线人数"
    },
    ping: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "服务器延迟"
    }
  }, {
    sequelize,
    tableName: 'server_data',
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

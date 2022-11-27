const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ServerTagData', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "服务器标签关联记录Id"
    },
    serverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "服务器Id"
    },
    serverTagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "服务器标签Id"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "创建关联的用户Id"
    }
  }, {
    sequelize,
    tableName: 'server_tag_data',
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

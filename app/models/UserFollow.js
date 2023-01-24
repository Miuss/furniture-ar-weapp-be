const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserFollow', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "关注者用户Id",
      field: 'user_id'
    },
    followUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "被关注者用户Id",
      field: 'follow_user_id'
    }
  }, {
    sequelize,
    tableName: 'user_follow',
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

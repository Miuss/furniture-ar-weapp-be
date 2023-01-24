const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Article', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "文章标题"
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "文章内容"
    },
    coverUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "文章封面",
      field: 'cover_url'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "用户Id",
      field: 'user_id'
    }
  }, {
    sequelize,
    tableName: 'article',
    timestamps: true,
    paranoid: true
  });
};

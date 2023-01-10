const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('File', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    fileType: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "文件类型",
      field: 'file_type'
    },
    fileUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "文件CDN地址",
      field: 'file_url'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "文件上传的用户Id"
    },
    bucket: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "文件CDN Bucket"
    }
  }, {
    sequelize,
    tableName: 'file',
    timestamps: true,
    paranoid: true
  });
};

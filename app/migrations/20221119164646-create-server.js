'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Servers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      uid: {
        type: Sequelize.INTEGER
      },
      server_ip: {
        type: Sequelize.STRING
      },
      server_port: {
        type: Sequelize.STRING
      },
      server_type: {
        type: Sequelize.STRING
      },
      server_max_player: {
        type: Sequelize.INTEGER
      },
      server_online_player: {
        type: Sequelize.INTEGER
      },
      server_ping: {
        type: Sequelize.STRING
      },
      server_version: {
        type: Sequelize.STRING
      },
      server_status: {
        type: Sequelize.STRING
      },
      server_county: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Servers');
  }
};
'use strict';
const sequelize = require('sequelize');
const DataTypes = sequelize.DataTypes;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('themes', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    await queryInterface.bulkInsert('themes', [
      { id: 1, name: 'default' },
      { id: 2, name: 'dark' },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('themes');
  },
};

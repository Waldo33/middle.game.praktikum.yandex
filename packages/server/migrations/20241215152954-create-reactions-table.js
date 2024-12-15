'use strict'
const sequelize = require('sequelize')
const DataTypes = sequelize.DataTypes

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable('reaction', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      topicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      emoji: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('reaction')
  },
}

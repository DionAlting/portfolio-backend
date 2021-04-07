"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("reservationDates", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: true,
      },
      maxSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      maxPerParty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isStampable: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("reservationDates");
  },
};

"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("reservationDates", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
        primaryKey: true,
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

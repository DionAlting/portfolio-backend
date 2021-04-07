"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "studyAssociations",
      [
        {
          name: "'t Haerlems Studenten Gildt",
          color: "green",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Personalia",
          color: "purple",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lepidoptera",
          color: "orange",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Voluptuaria",
          color: "blue",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Röntgenius",
          color: "red",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Virplaca",
          color: "pink",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("studyAssociations", null, {});
  },
};

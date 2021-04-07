"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "studyAssociations",
      [
        {
          id: "5060edbc-ae36-40ba-9b78-e6809d9cda6e",
          name: "'t Haerlems Studenten Gildt",
          color: "green",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a556da3d-e6d1-4675-952a-174c3e8660b5",
          name: "Personalia",
          color: "purple",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ae02ed9f-d39c-4f11-a133-7ecb7ea19551",
          name: "Lepidoptera",
          color: "orange",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "d52b5e23-baa5-437b-a12f-9278ee62ada7",
          name: "Voluptuaria",
          color: "blue",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "6b5e1c34-fb8a-4d76-9696-729cc8b9778b",
          name: "Röntgenius",
          color: "red",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e5cf2600-7337-49ed-bc71-85bcffb13524",
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

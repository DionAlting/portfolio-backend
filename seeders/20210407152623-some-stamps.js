"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "stamps",
      [
        {
          id: "687e647d-b454-44d9-babe-a336ad8532c2",
          eventId: "ec7783ef-4afd-4d1d-8c4c-8a57c0062a87",
          userId: "c674135c-82d9-4774-ac64-1fa812298ae2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "46c60812-2a80-43fe-866a-b475592744c5",
          reservationId: "088ecb0b-c922-4138-a27f-f89abf715b64",
          userId: "c674135c-82d9-4774-ac64-1fa812298ae2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stamps", null, {});
  },
};

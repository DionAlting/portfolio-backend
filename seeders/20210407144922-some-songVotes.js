"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "songVotes",
      [
        {
          id: "b1027c51-61b0-49d1-9f17-4329381ff015",
          songId: "e0902040-8b1d-4011-b990-43ead7095ff4",
          userId: "c674135c-82d9-4774-ac64-1fa812298ae2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "b47eb971-d71b-449d-8d38-16dd7cc05b1e",
          songId: "e0902040-8b1d-4011-b990-43ead7095ff4",
          userId: "8f93d913-c7e2-45e2-9086-b073f94f5a99",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "eb44388a-4177-4720-a29c-f4ae4543e9d8",
          songId: "e0902040-8b1d-4011-b990-43ead7095ff4",
          userId: "ddef6462-833f-418e-bda5-fb88730fc7ce",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "df918579-70e4-4bd1-8dca-63de965f335c",
          songId: "26d3e66d-cd1a-4fd3-866e-aacd143298a2",
          userId: "8f93d913-c7e2-45e2-9086-b073f94f5a99",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c46f008f-7b65-4a9a-a22a-c8789fe526d4",
          songId: "bf1a6f04-3633-4d38-be49-1bad17e42596",
          userId: "8f93d913-c7e2-45e2-9086-b073f94f5a99",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "988bf66b-088a-4bbd-a2c2-b4a1120436ac",
          songId: "64f9d442-936b-4f6b-a329-7f850c375c2f",
          userId: "c674135c-82d9-4774-ac64-1fa812298ae2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("songVotes", null, {});
  },
};

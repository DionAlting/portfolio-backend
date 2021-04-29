"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "songRequests",
      [
        {
          id: "e0902040-8b1d-4011-b990-43ead7095ff4",
          userId: "c674135c-82d9-4774-ac64-1fa812298ae2",
          artist: "Tiesto",
          title: "The business",
          voteCount: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "76fcf433-02bf-4130-a758-aa4e7510fa45",
          userId: "8f93d913-c7e2-45e2-9086-b073f94f5a99",
          artist: "Justin Bieber",
          title: "Hold on",
          voteCount: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "23d5718e-b6a9-45d3-914c-50669684994a",
          userId: "ddef6462-833f-418e-bda5-fb88730fc7ce",
          artist: "Ed Sheeran",
          title: "Afterglow",
          voteCount: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "26d3e66d-cd1a-4fd3-866e-aacd143298a2",
          userId: "8f93d913-c7e2-45e2-9086-b073f94f5a99",
          artist: "Dua Lipa",
          title: "We're good",
          voteCount: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "bf1a6f04-3633-4d38-be49-1bad17e42596",
          userId: "8f93d913-c7e2-45e2-9086-b073f94f5a99",
          artist: "The Black Eyed Peas",
          title: "GIRL LIKE ME",
          voteCount: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "64f9d442-936b-4f6b-a329-7f850c375c2f",
          userId: "c674135c-82d9-4774-ac64-1fa812298ae2",
          artist: "Daddy Yankee",
          title: "Con Calma",
          voteCount: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("songRequests", null, {});
  },
};

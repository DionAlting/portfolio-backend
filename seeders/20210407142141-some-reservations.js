"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "reservations",
      [
        {
          dateId: "70e751ab-1854-45ae-8fa1-76f4cb48c19e",
          userId: "c674135c-82d9-4774-ac64-1fa812298ae2",
          firstName: "Guest",
          lastName: "1",
          comment: "",
          isCanceled: false,
          isCheckedOut: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dateId: "70e751ab-1854-45ae-8fa1-76f4cb48c19e",
          userId: "c674135c-82d9-4774-ac64-1fa812298ae2",
          firstName: "Guest",
          lastName: "2",
          comment: "",
          isCanceled: false,
          isCheckedOut: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dateId: "a6a0d925-e00a-4535-8c96-78dfd2dcaa8a",
          userId: "c674135c-82d9-4774-ac64-1fa812298ae2",
          firstName: "Guest1",
          lastName: "lastname",
          comment: "PILS",
          isCanceled: false,
          isCheckedOut: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dateId: "51c8f34e-59ec-4ddf-beb2-c3dcd97928b2",
          userId: "8f93d913-c7e2-45e2-9086-b073f94f5a99",
          firstName: "Perso",
          lastName: "Nalia",
          comment: "Leaving early",
          isCanceled: false,
          isCheckedOut: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          dateId: "4f5c0fb3-eac9-406f-b2d8-0d19fec5dd9c",
          userId: "ddef6462-833f-418e-bda5-fb88730fc7ce",
          firstName: "Bad",
          lastName: "Person",
          comment: "I AM BAD",
          isCanceled: true,
          isCheckedOut: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("reservations", null, {});
  },
};

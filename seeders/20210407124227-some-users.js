"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/config.js");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: "c674135c-82d9-4774-ac64-1fa812298ae2",
          email: "test@test.com",
          firstName: "test",
          lastName: "user",
          passwordHash: bcrypt.hashSync("test1234", parseInt(SALT_ROUNDS)),
          displayName: "testUser123",
          avatar: "https://i.pravatar.cc/300",
          isAdmin: false,
          studyAssociationId: "5060edbc-ae36-40ba-9b78-e6809d9cda6e",
          isStudyAssociation: false,
          isBlocked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3162c78e-0ad7-4605-8359-2361d4e0bccf",
          email: "admin@hsgildt.nl",
          firstName: "Admin",
          lastName: "HSG",
          passwordHash: bcrypt.hashSync("password", parseInt(SALT_ROUNDS)),
          displayName: "HaerlemsStudentenGildt",
          avatar: "https://i.pravatar.cc/300",
          isAdmin: true,
          studyAssociationId: "5060edbc-ae36-40ba-9b78-e6809d9cda6e",
          isStudyAssociation: true,
          isBlocked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "8f93d913-c7e2-45e2-9086-b073f94f5a99",
          email: "personalia@hsgildt.nl",
          firstName: "Personalia",
          lastName: "Perso",
          passwordHash: bcrypt.hashSync("password", parseInt(SALT_ROUNDS)),
          displayName: "Personalia",
          avatar: "https://i.pravatar.cc/300",
          isAdmin: false,
          studyAssociationId: "a556da3d-e6d1-4675-952a-174c3e8660b5",
          isStudyAssociation: true,
          isBlocked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ddef6462-833f-418e-bda5-fb88730fc7ce",
          email: "bad@email.com",
          firstName: "Bad",
          lastName: "Person",
          passwordHash: bcrypt.hashSync("password", parseInt(SALT_ROUNDS)),
          displayName: "BlockedUser",
          avatar: "https://i.pravatar.cc/300",
          isAdmin: false,
          studyAssociationId: "e5cf2600-7337-49ed-bc71-85bcffb13524",
          isStudyAssociation: false,
          isBlocked: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};

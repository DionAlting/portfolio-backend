"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");
console.log(SALT_ROUNDS);
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          email: "test@test.com",
          firstName: "test",
          lastName: "user",
          passwordHash: bcrypt.hashSync("test1234", parseInt(SALT_ROUNDS)),
          displayName: "testUser123",
          avatar: "https://i.pravatar.cc/300",
          isAdmin: false,
          studyAssociation: "54b24314-41e5-431a-8d56-518e99d51f4f",
          isStudyAssociation: false,
          isBlocked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "admin@hsgildt.nl",
          firstName: "Admin",
          lastName: "HSG",
          passwordHash: bcrypt.hashSync("password", parseInt(SALT_ROUNDS)),
          displayName: "HaerlemsStudentenGildt",
          avatar: "https://i.pravatar.cc/300",
          isAdmin: true,
          studyAssociation: "54b24314-41e5-431a-8d56-518e99d51f4f",
          isStudyAssociation: true,
          isBlocked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "personalia@hsgildt.nl",
          firstName: "Personalia",
          lastName: "Perso",
          passwordHash: bcrypt.hashSync("password", parseInt(SALT_ROUNDS)),
          displayName: "Personalia",
          avatar: "https://i.pravatar.cc/300",
          isAdmin: false,
          studyAssociation: "25560cda-d6ca-4504-9d50-e86684d3cb06",
          isStudyAssociation: true,
          isBlocked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "bad@email.com",
          firstName: "Bad",
          lastName: "Person",
          passwordHash: bcrypt.hashSync("password", parseInt(SALT_ROUNDS)),
          displayName: "BlockedUser",
          avatar: "https://i.pravatar.cc/300",
          isAdmin: false,
          studyAssociation: "ff4e1852-9b90-4efc-8d65-33609fcea97a",
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

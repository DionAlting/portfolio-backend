"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "eventAttendees",
      [
        {
          id: "364a833a-5f07-43ab-a5d3-0106b064a292",
          eventId: "ec7783ef-4afd-4d1d-8c4c-8a57c0062a87",
          userId: "c674135c-82d9-4774-ac64-1fa812298ae2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "b97d65b6-c3a8-475e-9de5-efc6b1261cb5",
          eventId: "ec7783ef-4afd-4d1d-8c4c-8a57c0062a87",
          userId: "8f93d913-c7e2-45e2-9086-b073f94f5a99",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "68775b5f-2b4b-475f-b829-1941a1588133",
          eventId: "cab1fd31-2e9f-433f-9519-d9cbaaee7da5",
          userId: "c674135c-82d9-4774-ac64-1fa812298ae2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "d200e76d-bad1-47ff-a75a-e950cff04b8e",
          eventId: "4d215ec9-f1eb-4dfe-8c24-7eaf2f12dc4d",
          userId: "3162c78e-0ad7-4605-8359-2361d4e0bccf",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "f9684a8d-ecb3-4f7f-8d87-de9632b8e07b",
          eventId: "4d215ec9-f1eb-4dfe-8c24-7eaf2f12dc4d",
          userId: "c674135c-82d9-4774-ac64-1fa812298ae2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "10b86876-7a88-49c4-b326-39e5d7d69f6e",
          eventId: "4cb93e48-5009-4155-8c24-aadcc194b7a5",
          userId: "8f93d913-c7e2-45e2-9086-b073f94f5a99",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("eventAttendees", null, {});
  },
};

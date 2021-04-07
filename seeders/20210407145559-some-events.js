"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "events",
      [
        {
          id: "ec7783ef-4afd-4d1d-8c4c-8a57c0062a87",
          userId: "3162c78e-0ad7-4605-8359-2361d4e0bccf",
          title: "Test event 1 with stamp",
          content:
            "Mauris sit amet ex enim. Morbi eu lectus id metus ullamcorper venenatis efficitur nec augue. Curabitur aliquet hendrerit ex, sit amet ornare elit sollicitudin id. Nulla facilisi. Suspendisse pharetra tincidunt vehicula. Proin id orci placerat, sollicitudin magna id, aliquam orci. Fusce eu nulla consectetur, ullamcorper urna in, malesuada nibh. Donec id est sed tellus faucibus fringilla. Curabitur consectetur in mauris ac tincidunt.",
          eventDate: new Date(),
          startTime: new Date(),
          endTime: new Date(),
          eventImage: "https://via.placeholder.com/1024x512",
          isStampable: true,
          stampCode: Math.floor(100000 + Math.random() * 900000),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "cab1fd31-2e9f-433f-9519-d9cbaaee7da5",
          userId: "3162c78e-0ad7-4605-8359-2361d4e0bccf",
          title: "Test event 2 without stamp",
          content:
            "Mauris sit amet ex enim. Morbi eu lectus id metus ullamcorper venenatis efficitur nec augue. Curabitur aliquet hendrerit ex, sit amet ornare elit sollicitudin id. Nulla facilisi. Suspendisse pharetra tincidunt vehicula. Proin id orci placerat, sollicitudin magna id, aliquam orci. Fusce eu nulla consectetur, ullamcorper urna in, malesuada nibh. Donec id est sed tellus faucibus fringilla. Curabitur consectetur in mauris ac tincidunt.",
          eventDate: new Date(),
          startTime: new Date(),
          endTime: new Date(),
          eventImage: "https://via.placeholder.com/1024x512",
          isStampable: false,
          stampCode: Math.floor(100000 + Math.random() * 900000),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4d215ec9-f1eb-4dfe-8c24-7eaf2f12dc4d",
          userId: "8f93d913-c7e2-45e2-9086-b073f94f5a99",
          title: "Perso event without stamp",
          content:
            "Mauris sit amet ex enim. Morbi eu lectus id metus ullamcorper venenatis efficitur nec augue. Curabitur aliquet hendrerit ex, sit amet ornare elit sollicitudin id. Nulla facilisi. Suspendisse pharetra tincidunt vehicula. Proin id orci placerat, sollicitudin magna id, aliquam orci. Fusce eu nulla consectetur, ullamcorper urna in, malesuada nibh. Donec id est sed tellus faucibus fringilla. Curabitur consectetur in mauris ac tincidunt.",
          eventDate: new Date(),
          startTime: new Date(),
          endTime: new Date(),
          eventImage: "https://via.placeholder.com/1024x512",
          isStampable: false,
          stampCode: Math.floor(100000 + Math.random() * 900000),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4cb93e48-5009-4155-8c24-aadcc194b7a5",
          userId: "3162c78e-0ad7-4605-8359-2361d4e0bccf",
          title: "Event 4 with stamp",
          content:
            "Mauris sit amet ex enim. Morbi eu lectus id metus ullamcorper venenatis efficitur nec augue. Curabitur aliquet hendrerit ex, sit amet ornare elit sollicitudin id. Nulla facilisi. Suspendisse pharetra tincidunt vehicula. Proin id orci placerat, sollicitudin magna id, aliquam orci. Fusce eu nulla consectetur, ullamcorper urna in, malesuada nibh. Donec id est sed tellus faucibus fringilla. Curabitur consectetur in mauris ac tincidunt.",
          eventDate: new Date(),
          startTime: new Date(),
          endTime: new Date(),
          eventImage: "https://via.placeholder.com/1024x512",
          isStampable: true,
          stampCode: Math.floor(100000 + Math.random() * 900000),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("events", null, {});
  },
};

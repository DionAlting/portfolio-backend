"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "reservationDates",
      [
        {
          id: "70e751ab-1854-45ae-8fa1-76f4cb48c19e",
          date: "2021-04-08 02:14:29.288+00",
          maxSeats: 20,
          maxPerParty: 2,
          bookedSeats: 0,
          isStampable: true,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a6a0d925-e00a-4535-8c96-78dfd2dcaa8a",
          date: "2021-04-12 08:12:31.494+00",
          maxSeats: 20,
          maxPerParty: 2,
          bookedSeats: 8,
          isStampable: true,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "51c8f34e-59ec-4ddf-beb2-c3dcd97928b2",
          date: "2021-04-15 08:21:08.669+00",
          maxSeats: 20,
          maxPerParty: 2,
          bookedSeats: 18,
          isStampable: true,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4f5c0fb3-eac9-406f-b2d8-0d19fec5dd9c",
          date: "2021-04-10 17:30:42.905+00",
          maxSeats: 20,
          maxPerParty: 2,
          bookedSeats: 12,
          isStampable: true,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "8a824bd6-4bef-4253-85fe-56d78ee4260a",
          date: "2021-04-13 17:30:42.905+00",
          maxSeats: 20,
          maxPerParty: 2,
          bookedSeats: 20,
          isStampable: true,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("reservationDates", null, {});
  },
};

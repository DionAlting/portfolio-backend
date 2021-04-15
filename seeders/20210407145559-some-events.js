"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "events",
      [
        {
          id: "ec7783ef-4afd-4d1d-8c4c-8a57c0062a87",
          userId: "3162c78e-0ad7-4605-8359-2361d4e0bccf",
          title: "Gildt winter merchandise",
          content:
            "Haal 't Haerlems Studenten Gildt in huis met de officiële Gildt winter merchandise!  Of je ons nou om je nek, op je hoofd of in je boom hangt, proberen we toch jouw groene hartje te verwarmen. Merchandise is te bestellen via de knop bovenin!",
          eventDate: "2020-11-23T16:00:42.310Z",
          startTime: "2020-11-23T05:00:06.649Z",
          endTime: "2020-12-01T23:00:42.310Z",
          eventImage:
            "https://firebasestorage.googleapis.com/v0/b/hsgildt-c1a98.appspot.com/o/Gildtmerchbanner.png?alt=media",
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
          startTime: "2020-07-27T18:00:46.282Z",
          endTime: "2020-07-27T02:00:46.282Z",
          eventImage: "https://via.placeholder.com/1024x512",
          isStampable: false,
          stampCode: Math.floor(100000 + Math.random() * 900000),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4d215ec9-f1eb-4dfe-8c24-7eaf2f12dc4d",
          userId: "8f93d913-c7e2-45e2-9086-b073f94f5a99",
          title: "Pubquiz met Bennet",
          content:
            "Het is al weer even geleden maar het is weer tijd voor een Pubquiz. Deze keer gepresenteerd en bedacht door de enige echte Bennet de Goede. Jullie hebben hem al eerder zien shinen voor de pubquizes van de studievereniging Personalia en ook deze keer heeft hij weer een aantal leuke vragen voor jullie bedacht! Het leuke aan dit alles is dat het geheel gratis is en er toch leuke prijzen te winnen zijn, hoe leuk is dat !!8 augustus gaat het gebeuren om 20.30 uur. De inloop is vanaf 20.00 uur. Let op !!! Er is maar plek voor 10 teams beschikbaar en er wordt alleen gespeeld met teams van 2 personen. Vergeet daarbij jullie teamnaam niet te vermelden!",
          eventDate: "2020-08-08T16:09:00.000Z",
          startTime: "2020-07-27T18:00:46.282Z",
          endTime: "2020-07-27T02:00:46.282Z",
          eventImage:
            "https://firebasestorage.googleapis.com/v0/b/hsgildt-c1a98.appspot.com/o/9125470.jpg?alt=media",
          isStampable: false,
          stampCode: Math.floor(100000 + Math.random() * 900000),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4cb93e48-5009-4155-8c24-aadcc194b7a5",
          userId: "3162c78e-0ad7-4605-8359-2361d4e0bccf",
          title: "Omdat je niet naar Defqon",
          content:
            "Omdat je niet naar “Defqon”, halen wij Defqon naar jou! Zaterdag zullen we in ‘t Gildt de livestream van Defqon aanzetten op groot scherm voor een heuse Defqon themaavond! Daar wil je bij zijn!!! Reserveren kan bovenaan de pagina!  Onthoud vol = vol !!",
          eventDate: "2020-06-27T15:38:00.000Z",
          startTime: "2020-06-21T18:00:42.310Z",
          endTime: "2020-06-21T02:00:42.310Z",
          eventImage:
            "https://firebasestorage.googleapis.com/v0/b/hsgildt-c1a98.appspot.com/o/16875.jpeg?alt=media",
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

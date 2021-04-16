const { Router } = require("express");

const authMiddleware = require("../auth/middleware").auth;
const isAdmin = require("../auth/middleware").isAdmin;

const Event = require("../models").event;
const User = require("../models/").user;
const StudyAssociation = require("../models/").studyAssociation;
const Reservation = require("../models/").reservation;
const ReservationDate = require("../models/").reservationDate;

const router = new Router();

router.get("/reservations", authMiddleware, isAdmin, async (req, res) => {
  try {
    const reservationDates = await ReservationDate.findAll({
      include: [
        {
          model: Reservation,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      order: [["date", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!reservationDates) {
      return res.status(404).send({
        message: "No events found",
      });
    }
    return res.status(200).send({ reservationDates });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;

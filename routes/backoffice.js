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
        message: "No reservations found",
      });
    }
    return res.status(200).send({ reservationDates });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.put(
  "/:reservationId/checkout",
  authMiddleware,
  isAdmin,
  async (req, res) => {
    try {
      const { reservationId } = req.params;
      const { id } = req.user;
      const reservation = await Reservation.findByPk(reservationId);

      if (!reservation) {
        return res.status(404).send({
          message: "Reservation not found",
        });
      }
      const reservationDate = await ReservationDate.findByPk(
        reservation.dateId
      );

      if (reservationDate.isStampable) {
        await Stamp.create({ userId: id, reservationId: reservation.id });
      }

      await reservation.update({ isCheckedOut: !reservation.isCheckedOut });

      return res.status(200).send({ message: "User checked out successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Something went wrong, sorry" });
    }
  }
);

router.put(
  "/:reservationId/cancel",
  authMiddleware,
  isAdmin,
  async (req, res) => {
    try {
      const { reservationId } = req.params;
      const reservation = await Reservation.findByPk(reservationId);

      if (!reservation) {
        return res.status(404).send({
          message: "Reservation not found",
        });
      }

      await reservation.update({ isCheckedOut: !reservation.isCanceled });

      return res
        .status(200)
        .send({ message: "Reservation canceled successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Something went wrong, sorry" });
    }
  }
);

module.exports = router;

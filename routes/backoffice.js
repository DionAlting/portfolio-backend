const { Router } = require("express");
const { Op } = require("sequelize");
const authMiddleware = require("../auth/middleware").auth;
const isAdmin = require("../auth/middleware").isAdmin;

const Event = require("../models").event;
const User = require("../models/").user;
const StudyAssociation = require("../models/").studyAssociation;
const Reservation = require("../models/").reservation;
const ReservationDate = require("../models/").reservationDate;
const Stamp = require("../models/").stamp;

const router = new Router();

router.get("/reservations", authMiddleware, isAdmin, async (req, res) => {
  try {
    const reservationDates = await ReservationDate.findAll({
      include: [
        {
          model: Reservation,
          where: {
            [Op.and]: [{ isCanceled: false }, { isCheckedOut: false }],
          },
          order: [["userId", "ASC"]],
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
        await Stamp.create({
          userId: reservation.userId,
          reservationId: reservation.id,
        });
      }
      await reservationDate.decrement("bookedSeats");

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
      const reservationDate = await ReservationDate.findByPk(
        reservation.dateId
      );

      await reservationDate.decrement("bookedSeats");
      return res
        .status(200)
        .send({ message: "Reservation canceled successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Something went wrong, sorry" });
    }
  }
);

router.put(
  "/:reservationId/increment",
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

      await reservation.increment("coins");

      return res.status(200).send({ message: "Incremented successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Something went wrong, sorry" });
    }
  }
);

router.put(
  "/:reservationId/decrement",
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

      await reservation.decrement("coins");

      return res.status(200).send({ message: "Decremented successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Something went wrong, sorry" });
    }
  }
);

module.exports = router;

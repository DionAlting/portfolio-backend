const { Router } = require("express");
const { Op } = require("sequelize");

const authMiddleware = require("../auth/middleware").auth;

const Reservation = require("../models/").reservation;
const ReservationDate = require("../models/").reservationDate;

const router = new Router();

router.get("/dates", async (req, res) => {
  try {
    const allReservationDates = await ReservationDate.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order: [["date", "ASC"]],
    });

    if (!allReservationDates) {
      return res.status(404).send({
        message: "No reservation dates found",
      });
    }
    return res.status(200).send(allReservationDates);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/:dateId", authMiddleware, async (req, res) => {
  try {
    const { dateId } = req.params;
    const { id, isAdmin } = req.user;
    const { reservationDetails, comment } = req.body;

    const partySize = req.body.reservationDetails.length;

    const reservationDate = await ReservationDate.findByPk(dateId);
    if (!reservationDate) {
      return res.status(404).send({ message: "Date does not exist" });
    }

    if (reservationDate.bookedSeats + partySize > reservationDate.maxSeats) {
      return res.status(400).send({
        message: `Max amount of reservations (${reservationDate.maxSeats}) for this day exceeded`,
      });
    }

    if (partySize > reservationDate.maxPerParty) {
      return res
        .status(400)
        .send({ message: `Max ${reservationDate.maxPerParty} per party.` });
    }

    const hasReserved = await Reservation.findOne({
      where: {
        [Op.and]: [{ dateId: reservationDate.id }, { userId: id }],
      },
    });

    if (hasReserved && !isAdmin) {
      return res
        .status(400)
        .send({ message: "You already made a reservation for this day" });
    }

    const insert = reservationDetails.map((item) => ({
      dateId: reservationDate.id,
      userId: id,
      comment: comment,
      ...item,
    }));

    await Reservation.bulkCreate(insert);

    const userReservations = await Reservation.findAll({
      where: {
        [Op.and]: [
          { isCanceled: false },
          { isCheckedOut: false },
          { userId: id },
        ],
      },
      attributes: { exclude: ["createdAt", "updatedAt", "coins"] },
      include: [
        {
          model: ReservationDate,
          attributes: ["date"],
        },
      ],
      order: [[ReservationDate, "date", "ASC"]],
    });
    await reservationDate.increment("bookedSeats", { by: partySize });

    return res.status(200).send({
      message: "Reservation created successfully!",
      userReservations,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({ message: `Something went wrong, sorry` });
  }
});

router.put("/:reservationId", authMiddleware, async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { dateId } = req.body;
    const { id } = req.user;

    const reservation = await Reservation.findByPk(reservationId);

    const reservationDate = await ReservationDate.findOne({
      where: { id: dateId },
    });

    if (!reservation) {
      return res.status(404).send({ message: "Reservation does not exist" });
    }

    if (!reservation.userId === id) {
      return res.status(401).send({ message: "UnAuthorized" });
    }

    const updatedReservation = await reservation.update({
      isCanceled: !reservation.isCanceled,
    });

    await reservationDate.decrement("bookedSeats");

    return res.status(200).send({
      message: "Reservation canceled successfully!",
      updatedReservation,
    });
  } catch (error) {
    return res.status(400).send({ message: `Something went wrong, sorry` });
  }
});

router.get("/reservations", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;

    const allReservations = await Reservation.findAll({
      where: {
        [Op.and]: [
          { isCanceled: false },
          { isCheckedOut: false },
          { userId: id },
        ],
      },
      attributes: { exclude: ["createdAt", "updatedAt", "coins"] },
      include: [
        {
          model: ReservationDate,
          attributes: ["date"],
        },
      ],
      order: [[ReservationDate, "date", "ASC"]],
    });

    if (!allReservations) {
      return res.status(404).send({
        message: "No reservations found",
      });
    }
    return res.status(200).send(allReservations);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;

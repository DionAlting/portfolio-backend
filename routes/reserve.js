const { Router } = require("express");
const { Op } = require("sequelize");

const authMiddleware = require("../auth/middleware").auth;

const Reservation = require("../models/").reservation;
const ReservationDate = require("../models/").reservationDate;

const router = new Router();

router.get("/", async (req, res) => {
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
    const { date } = req.body;
    const { id, isAdmin } = req.user;

    const reservationDate = await ReservationDate.findByPk(dateId);
    if (!reservationDate) {
      return res.status(404).send({ message: "Date does not exist" });
    }

    if (req.body.reservationDetails.length > reservationDate.maxPerParty) {
      return res
        .status(400)
        .json({ error: `Max ${reservationDate.maxPerParty} per party.` });
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
    const reservationDetails = req.body.reservationDetails;

    const insert = reservationDetails.map((item) => ({
      dateId: reservationDate.id,
      userId: id,
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
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: ReservationDate,
          attributes: ["date"],
        },
      ],
      order: [[ReservationDate, "date", "ASC"]],
    });

    return res.status(200).send({
      message: "Reservation created successfully!",
      userReservations,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .send({ message: `Something went wrong, sorry`, error });
  }
});

router.put("/:reservationId", authMiddleware, async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { id } = req.user;

    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      return res.status(404).send({ message: "Reservation does not exist" });
    }

    if (!reservation.userId === id) {
      return res.status(401).send({ message: "UnAuthorized" });
    }

    const updatedReservation = await reservation.update({
      isCanceled: !reservation.isCanceled,
    });

    return res.status(200).send({
      message: "Reservation canceled successfully!",
      updatedReservation,
    });
  } catch (error) {
    return res.status(400).send({ message: `Something went wrong, sorry` });
  }
});

module.exports = router;

const { Router } = require("express");
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
      return res.status(400).send({
        message: "No reservation dates found",
      });
    }
    return res.status(200).send(allReservationDates);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;

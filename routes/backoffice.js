const { Router } = require("express");

const authMiddleware = require("../auth/middleware").auth;
const isAdmin = require("../auth/middleware").isAdmin;

const Event = require("../models").event;
const User = require("../models/").user;
const StudyAssociation = require("../models/").studyAssociation;
const Reservation = require("../models/").reservation;
const ReservationDate = require("../models/").reservationDate;

const router = new Router();

module.exports = router;

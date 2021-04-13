const { Router } = require("express");
const { Op } = require("sequelize");

const authMiddleware = require("../auth/middleware").auth;

const User = require("../models/").user;

const router = new Router();

module.exports = router;

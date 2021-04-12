const { Router } = require("express");
const { Op } = require("sequelize");

const authMiddleware = require("../auth/middleware").auth;

const SongRequests = require("../models/").songRequest;
const SongVotes = require("../models/").songVote;
const User = require("../models/").user;

const router = new Router();

router.get("/requests", async (req, res) => {
  try {
    const allRequests = await SongRequests.findAll({
      include: [
        {
          model: User,
          as: "votes",
          attributes: [["id", "userId"]],
          through: { attributes: [] },
        },
      ],
    });

    if (!allRequests) {
      return res.status(404).send({
        message: "No reservation dates found",
      });
    }
    return res.status(200).send(allRequests);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;

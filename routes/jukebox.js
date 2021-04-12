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

router.post("/requests", authMiddleware, async (req, res) => {
  try {
    const { title, artist } = req.body;
    const { id } = req.user;

    const newRequest = await SongRequests.create({
      userId: id,
      title,
      artist,
    });

    await SongVotes.create({
      songRequestId: newRequest.id,
      userId: id,
    });

    const newSongRequest = await SongRequests.findByPk(newRequest.id, {
      include: [
        {
          model: User,
          as: "votes",
          attributes: [["id", "userId"]],
          through: { attributes: [] },
        },
      ],
    });

    return res.status(200).send({
      message: "Song request created successfully!",
      newSongRequest,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.put("/:songRequestId/upvote", authMiddleware, async (req, res) => {
  try {
    const { songRequestId } = req.params;
    const { dateId } = req.body;
    const { id, isAdmin } = req.user;

    const requestedSong = await SongRequests.findByPk(songRequestId);

    if (!requestedSong) {
      return res.status(404).send({ message: "Song does not exist" });
    }
    const hasUserVoted = await SongVotes.findOne({
      where: {
        [Op.and]: [{ songRequestId: requestedSong.id }, { userId: id }],
      },
    });

    if (hasUserVoted && !isAdmin) {
      return res
        .status(400)
        .send({ message: "You already voted on this song" });
    }

    await requestedSong.increment("voteCount");

    return res.status(200).send({
      message: "Song upvoted successfully!",
    });
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;

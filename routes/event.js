const { Router } = require("express");

const Event = require("../models").event;
const User = require("../models/").user;
const StudyAssociation = require("../models/").studyAssociation;

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const allEvents = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ["id"],
          as: "creator",
          include: {
            model: StudyAssociation,
            attributes: ["id", "name", "color"],
          },
        },
        {
          model: User,
          as: "attendees",
          attributes: [["id", "userId"]],
          through: { attributes: [] },
        },
      ],
      attributes: { exclude: ["stampCode", "createdAt", "updatedAt"] },
    });

    if (!allEvents) {
      return res.status(404).send({
        message: "No events found",
      });
    }
    return res.status(200).send({ allEvents });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;

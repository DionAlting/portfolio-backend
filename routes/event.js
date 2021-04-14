const { Router } = require("express");

const Event = require("../models").event;
const User = require("../models/").user;
const StudyAssociation = require("../models/").studyAssociation;

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const allRequests = await Event.findAll({
      include: [
        {
          model: User,
          attributes: ["displayName", "id"],
          as: "creator",
          include: {
            model: StudyAssociation,
            attributes: ["id", "name", "color"],
          },
        },
      ],
      attributes: { exclude: ["stampCode", "createdAt", "updatedAt"] },
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

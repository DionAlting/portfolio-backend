const { Router } = require("express");
const { Op } = require("sequelize");

const StudyAssociation = require("../models/").studyAssociation;

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const studyAssociations = await StudyAssociation.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!studyAssociations) {
      return res.status(404).send({
        message: "Study Associations not found",
      });
    }

    return res.status(200).send({ studyAssociations });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;

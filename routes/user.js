const { Router } = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/config.js");

const authMiddleware = require("../auth/middleware").auth;

const User = require("../models/").user;
const StudyAssociation = require("../models/").studyAssociation;

const router = new Router();

router.patch("/:userId", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;
    const userById = await User.findByPk(userId);

    if (!userById) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    if (!userById.id === id) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const updatedUser = await userById.update(req.body.values);

    const cleanUpdatedUser = await User.findOne({
      where: { id: updatedUser.id },
      attributes: {
        exclude: ["passwordHash", "studyAssociationId", "updatedAt"],
      },
      include: [
        {
          model: StudyAssociation,
          attributes: ["name", "id"],
        },
      ],
    });

    return res
      .status(200)
      .send({ message: "User updated successfully!", cleanUpdatedUser });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.patch("/:userId/changepassword", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const { userId } = req.params;
    const { password } = req.body.values;
    const userById = await User.findByPk(userId);

    if (!userById) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    if (!userById.id === id) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    await userById.update({
      passwordHash: bcrypt.hashSync(password, parseInt(SALT_ROUNDS)),
    });

    return res.status(200).send({ message: "Password changed successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;

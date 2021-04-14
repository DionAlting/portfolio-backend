const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware").auth;
const User = require("../models/").user;
const StudyAssociation = require("../models/").studyAssociation;
const Reservation = require("../models/").reservation;
const { SALT_ROUNDS } = require("../config/config.js");

const Joi = require("joi");

const router = new Router();

const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true, // remove unknown props
};

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

router.post("/login", async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body, options);

    if (error) {
      return res.status(400).send({
        message: `Validation error: ${error.details
          .map((x) => x.message)
          .join(", ")}`,
      });
    }
    const { email, password } = value;
    const user = await User.findOne({
      where: { email },
      attributes: {
        exclude: ["studyAssociationId", "updatedAt"],
      },
      include: [
        {
          model: StudyAssociation,
          attributes: ["name"],
        },
      ],
    });

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }
    if (user.isBlocked) {
      return res.status(401).send({ message: "Your account is blocked" });
    }

    delete user.dataValues["passwordHash"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res.status(200).send({ token, ...user.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().min(6).required(),
  displayName: Joi.string().min(4).required(),
});

router.post("/signup", async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body, options);

    if (error) {
      return res.status(400).send({
        message: `Validation error: ${error.details
          .map((x) => x.message)
          .join(", ")}`,
      });
    }
    const { email, password, firstName, lastName, displayName } = value;
    const newUser = await User.create({
      email,
      firstName,
      lastName,
      passwordHash: bcrypt.hashSync(password, parseInt(SALT_ROUNDS)),
      displayName,
    });

    const { id } = newUser;
    const cleanNewUser = await User.findOne({
      where: { id },
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

    const token = toJWT({ userId: cleanNewUser.id });

    res.status(201).json({ token, ...cleanNewUser.dataValues });
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/profile", authMiddleware, async (req, res) => {
  // don't send back the password hash

  delete req.user.dataValues["passwordHash"];
  res.status(200).send({ ...req.user.dataValues });
});

module.exports = router;

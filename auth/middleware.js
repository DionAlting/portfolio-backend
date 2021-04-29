const User = require("../models").user;
const StudyAssociation = require("../models").studyAssociation;
const Stamp = require("../models/").stamp;
const { toData } = require("./jwt");

const auth = async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");

  // Check token
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const user = await User.findByPk(data.userId, {
        attributes: {
          exclude: ["passwordHash", "studyAssociationId", "updatedAt"],
        },
        include: [
          {
            model: StudyAssociation,
            attributes: ["name", "id"],
          },
          {
            model: Stamp,
          },
        ],
      });

      // Check if user exists and set user to request
      if (!user) {
        res.status(404).send("User not found");
      } else {
        req.user = user;
        next();
      }
    } catch (e) {
      if (e.name === "TokenExpiredError") {
        res.status(401).send("Token is expired");
      } else {
        res.status(400).send("Invalid JWT token");
      }
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
  }
};

const isAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  next();
};

const isStudyAssociation = async (req, res, next) => {
  if (!req.user.isStudyAssociation) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = { auth, isAdmin, isStudyAssociation };

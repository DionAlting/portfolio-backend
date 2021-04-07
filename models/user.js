"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.reservation);
      user.hasMany(models.stamp);

      user.hasMany(models.songRequest, { as: "requester" });
      user.belongsToMany(models.songRequest, {
        through: "songVotes",
        foreignKey: "userId",
        as: "voter",
      });

      user.hasMany(models.event, { as: "owner" });
      user.belongsToMany(models.event, {
        through: "eventAttendees",
        foreignKey: "userId",
        as: "attendee",
      });
      user.hasMany(models.studyAssociation);
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      displayName: { type: DataTypes.STRING, allowNull: false, unique: true },
      avatar: { type: DataTypes.STRING },
      studyAssociation: { type: DataTypes.UUID, allowNull: false },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isStudyAssociation: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};

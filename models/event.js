"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      event.belongsTo(models.user, { as: "creator", foreignKey: "userId" });
      event.belongsToMany(models.user, {
        through: "eventAttendees",
        foreignKey: "eventId",
        as: "attendees",
      });
    }
  }
  event.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: { type: DataTypes.UUID, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      eventDate: { type: DataTypes.DATE, allowNull: false },
      startTime: { type: DataTypes.DATE, allowNull: false },
      endTime: { type: DataTypes.DATE, allowNull: false },
      eventImage: DataTypes.STRING,
      isStampable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      stampCode: {
        type: DataTypes.INTEGER,
        defaultValue: Math.floor(100000 + Math.random() * 900000),
      },
    },
    {
      sequelize,
      modelName: "event",
    }
  );
  return event;
};

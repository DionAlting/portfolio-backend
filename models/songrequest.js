"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class songRequest extends Model {
    static associate(models) {
      // songRequest.belongsTo(models.user, {
      //   as: "requester",
      //   foreignKey: "userId",
      // });
      songRequest.belongsToMany(models.user, {
        through: "songVotes",
        foreignKey: "songRequestId",
        as: "votes",
      });
    }
  }
  songRequest.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: { type: DataTypes.UUID, allowNull: false },
      artist: { type: DataTypes.STRING, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "songRequest",
    }
  );
  return songRequest;
};

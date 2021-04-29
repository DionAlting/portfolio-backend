"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class songVote extends Model {
    static associate(models) {
      //songVote.belongsTo(models.songRequest, { foreignKey: "songRequestId" });
      // songVote.belongsTo(models.user);
    }
  }
  songVote.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      songRequestId: { type: DataTypes.UUID, allowNull: false },
      userId: { type: DataTypes.UUID, allowNull: false },
    },
    {
      sequelize,
      modelName: "songVote",
    }
  );
  return songVote;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class songRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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

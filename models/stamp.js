"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class stamp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      stamp.belongsTo(models.user);
      stamp.belongsTo(models.reservation);
      stamp.belongsTo(models.event);
    }
  }
  stamp.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: { type: DataTypes.UUID, allowNull: false },
      eventId: DataTypes.UUID,
      reservationId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "stamp",
    }
  );
  return stamp;
};

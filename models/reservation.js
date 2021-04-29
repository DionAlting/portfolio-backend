"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      reservation.belongsTo(models.reservationDate, { foreignKey: "dateId" });
      reservation.belongsTo(models.user);
      reservation.hasMany(models.stamp);
    }
  }
  reservation.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      dateId: { type: DataTypes.UUID, allowNull: false },
      userId: { type: DataTypes.UUID, allowNull: false },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      comment: { type: DataTypes.STRING },
      coins: { type: DataTypes.INTEGER, defaultValue: 0 },
      isCanceled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isCheckedOut: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "reservation",
    }
  );
  return reservation;
};

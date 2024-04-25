const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const CardCollection = sequelize.define(
  "CardCollection",
  {
    numInCollection: {
        type:DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: true
    }
  },
);

module.exports = CardCollection;

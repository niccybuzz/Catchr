const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Set = sequelize.define(
  "Set",
  {
    set_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    set_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_of_cards: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
  },
  {
    tableName: "sets",
  }
);

module.exports = Set;
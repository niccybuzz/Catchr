const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Rarity = sequelize.define(
    "Rarity",
    {
      rarity_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, 
      },
      rarity_description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rarity_icon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

  );

module.exports = Rarity;
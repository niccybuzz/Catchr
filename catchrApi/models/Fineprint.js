const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Fineprint = sequelize.define(
    "Fineprint",
    {
      fineprint_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, 
      },
      fineprint_text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

  );

module.exports = Fineprint;
const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Illustrator = sequelize.define(
    "Illustrator",
    {
      illustrator_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true, 
      },
      illustrator_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

  );

module.exports = Illustrator;
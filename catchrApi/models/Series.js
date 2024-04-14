const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Series = sequelize.define(
  "Series",
  {
    series_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    series_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "series",
  }
);

module.exports = Series;
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Type = sequelize.define(
  "Type",
  {
    type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    type_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "types",
  }
);

module.exports = Type;

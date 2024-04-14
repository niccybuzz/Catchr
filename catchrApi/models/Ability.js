const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Ability = sequelize.define(
  "Ability",
  {
    ability_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    ability_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ability_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ability_damage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    primary_cost: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    secondary_cost: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
  },
  {
    tableName: "abilities",
  }
);

module.exports = Ability;

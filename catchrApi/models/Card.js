const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Card = sequelize.define(
  "Card",
  {
    card_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    card_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    card_set_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    card_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    height_weight:{
        type: DataTypes.STRING,
        allowNull: true
    },
    card_description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    weakness_type_id:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weakness_amount:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    resistance_type_id:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    resistance_amount:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    retreat_type_id:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    retreat_cost:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "cards",
  }
);

module.exports = Card;

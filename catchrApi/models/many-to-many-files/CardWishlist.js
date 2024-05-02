const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const CardWishlist = sequelize.define(
  "CardWishlist",
);

module.exports = CardWishlist;

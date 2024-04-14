const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define("Category", {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  category_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;

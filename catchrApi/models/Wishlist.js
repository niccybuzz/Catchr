const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Wishlist = sequelize.define(
  "Wishlist",
  {
    wishlist_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true, 
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numCards: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  },
);

// Update NumCards after a new association between Collection and Card is created
Wishlist.afterBulkCreate(async (wishlists, options) => {
  for (const wishlist of wishlists) {
    const numCards = await wishlist.countCards();
    await wishlist.update({ numCards });
  }
});

module.exports = Wishlist;

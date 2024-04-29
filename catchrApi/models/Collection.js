const { DataTypes } = require('sequelize');
const sequelize = require("../config/database");

const Collection = sequelize.define(
  "Collection",
  {
    collection_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: true, 
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    numLikes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    numCards: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  },
  {
    tableName: "collections",
  }
);

// Update NumCards after a new association between Collection and Card is created
Collection.afterBulkCreate(async (collections, options) => {
  for (const collection of collections) {
    const numCards = await collection.countCards();
    await collection.update({ numCards });
  }
});

module.exports = Collection;

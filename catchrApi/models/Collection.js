const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Collection = sequelize.define(
  "Collection",
  {
    collection_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    collection_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    tableName: "collections",
  }
);

Collection.sync()
  .then(() => {
    console.log("Collection synced");
  })
  .catch((err) => {
    console.error("Error syncing collection:", err);
  });

  //Collection.belongsTo(User);

module.exports = Collection;

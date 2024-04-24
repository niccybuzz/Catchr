const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const CardCollection = sequelize.define('CardCollection', {
  // Define your model attributes
  cardcollection_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CollectionCollectionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  CardCardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'cardcollections', // Add this line to specify the table name
  foreignKeys: [
    {
      name: 'card_card_id',
      field: 'CardCardId',
      references: {
        table: 'cards',
        field: 'card_id'
      }
    },
    {
      name: 'collection_collection_id',
      field: 'CollectionCollectionId',
      references: {
        table: 'collections',
        field: 'collection_id'
      }
    }
  ]
});

module.exports = CardCollection;

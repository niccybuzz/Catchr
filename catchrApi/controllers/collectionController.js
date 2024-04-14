// A controller with a series of sequelize methods for querying card collections in a database

const Collection = require("../models/Collection")

//Get a singular specific collection
exports.getCollectionById = async (collectionid, res) => {
  try {
    const foundCollection = await Collection.findByPk(collectionid);
    if (!foundCollection) {
      throw new Error("Collection not found");
    }
    return foundCollection;
  } catch (err) {
    throw new Error(`Error getting collection: ${err.message}`);
  }
};

// get all collections
exports.getAllCollections = async (req, res) => {
  try {
    console.log("Searching all connections")
    const Collections = await Collection.findAll();
    console.log(Collections)
    return Collections;
  } catch (error) {
    throw new Error(`Can't find any collections`);
  }
};

//create a new collection
exports.createCollection = async (collectionData) => {
  try {
    const newCollection = await Collection.create(collectionData);
    return newCollection;
  } catch (err) {
    throw new Error(`Error creating collection: ${err.message}`);
  }
};

//update a current collection
exports.updateCollection = async (collection_id, newData) => {
  try {
    const collectToUpdate = await Collection.findByPk(collection_id);
    if (!collectToUpdate) {
      throw new Error("Can't find that collection");
    }
    await collectToUpdate.update({ collection_name: newData });
    await collectToUpdate.reload();
    return collectToUpdate;
  } catch (error) {
    throw new Error(`Error updating collection: ${error.message}`);
  }
};

//delete a collection
exports.deleteCollection = async (collection_id) => {
  try {
    const collectToDelete = await Collection.findByPk(collection_id);
    if (!collectToDelete){
      throw new Error("Can't find that collection to delete");
    }
    await collectToDelete.destroy();
    return (collectToDelete);
  } catch (error) {
    throw new Error(`Error deleting collection: ${error.message}`)
  }
}

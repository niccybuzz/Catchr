// controllers/userController.js
const { col } = require("sequelize");
const Collection = require("../models/Collection");

exports.getAllCollections = async (req, res) => {
  try {
    const Collections = await Collection.findAll();
    return Collections;
  } catch (error) {
    throw new Error(`Can't find any collections`);
  }
};

exports.createCollection = async (collectionData) => {
  try {
    const newCollection = await Collection.create(collectionData);
    return newCollection;
  } catch (err) {
    throw new Error(`Error creating collection: ${err.message}`);
  }
};

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

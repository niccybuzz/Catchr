const express = require("express");
const CollectionController = require("../controllers/collectionController");

const router = express.Router();

//Get single collection by ID route
router.get("/:id", async (req, res) => {
  const collectionId = req.params.id;
  try {
    const collection = await CollectionController.getCollectionById(collectionId);
    res.status(200).json({
      message: "Collection found succesfully",
      collection: collection,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

//get all collections Route
router.get("/", async (req, res) => {
  try {
    const collections = await CollectionController.getAllCollections();
    res.status(200).json({
      message: "Collections retrieved Successfully",
      collections: collections,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Create new collection
router.post("/", async (req, res) => {
  const { collection_name, user_id } = req.body;
  try {
    const collection = await CollectionController.createCollection({
      collection_name,
      user_id,
    });
    res.status(201).json({
      message: "Collection created Successfully ",
      collection: collection,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Update collection by ID
router.put("/:id", async (req, res) => {
  const collection_id = req.params.id;
  const { collection_name } = req.body;
  try {
    const collection = await CollectionController.updateCollection(collection_id, collection_name);
    res.status(200).json({
      message: "Collection updated succesfully",
      updatedCollection: collection,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Delete a collection
router.delete("/:id", async (req, res) => {
  const collection_id = req.params.id;
  try {
    const response = await CollectionController.deleteCollection(collection_id);
    res.status(200).json({
      message: "Collection deleted successfully",
      deletedCollection: response,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

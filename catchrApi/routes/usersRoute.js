const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const User = require("../models/User");

// Define routes through controller methods
router.get("/", userController.getAllUsers);

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await userController.registerUser(
      username,
      email,
      password
    );
    res.status(200).json({
      message: "User registered succesfully",
      newUser: newUser,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    await userController.loginUser(username, password);
    res.status(200).json({
      message: "Logged in succesfully",
      user: username,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//router.get('/:id', CollectionController.getCollectionById);
//router.put('/:id', CollectionController.updateCollection);
//router.delete('/:id', CollectionController.deleteCollection);

module.exports = router;

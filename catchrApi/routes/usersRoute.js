//A series of rountes for user related endpoints
const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

//get users alongside all of their collections
router.get("/collections/:userid", async(req, res) => {
  let userId = req.params.userid;
  const { user, statusCode } = await userController.getSingleUserWithCollections(userId)
  res.status(200).json(user)
});

//get users alongside all of their collections
router.get("/collections", userController.getUserWithCollections);



// Get a single user by ID
router.get("/:userid", async (req, res) => {
  let userId = req.params.userid;
  const { user, statusCode } = await userController.getUserById(userId);
  res.status(statusCode).json(user);
});

//get all users
router.get("/", userController.getAllUsers);

//create a new user (register)
//Passwords encrypted here
// all fields mandatory
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = await userController.registerUser(username, email, password);
  res.json(newUser);
});

//Login to your account
//Checked password also encrypted here
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

// Update a single user
router.put("/:userid", async (req, res) => {
const id = req.params.userid;
  const { new_username, email, admin } = req.body;
  try {
    const userToUpdate = await userController.updateUser(
      id,
      new_username,
      email,
      admin
    );
    res.status(200).json(userToUpdate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/changepassword/:userid", async (req, res) => {
  const userid = req.params.userid;
  const { oldPassword, newPassword } = req.body;
  try {
    const userToUpdate = await userController.updatePassword(
      userid,
      oldPassword,
      newPassword
    );
    res.status(200).json({
      message: "Password changed succesfully",
      updatedUser: userToUpdate,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//router.put('/:id', CollectionController.updateCollection);
//router.delete('/:id', CollectionController.deleteCollection);

module.exports = router;

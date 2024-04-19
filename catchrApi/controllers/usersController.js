//A series of rountes for user related endpoints
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateJWT = require("../auth/authenticateJWT");

const User = require("../models/User");
const { Op } = require("sequelize");
const router = express.Router();

// Get a single user by ID
router.get("/:userid", async (req, res) => {
  let userId = req.params.userid;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      res.status(200).json({ message: "User found succesfully", user: user });
    } else {
      res.status(404).json({ message: "Can't find that user by id" });
    }
  } catch {
    res.status(500).json("Server error");
  }
});

//get all users
router.get("/", async (req, res) => {
  try {
    //Optional sorting and filtering queries for username and email
    let { username, email, sortBy, sortOrder } = req.query;
    const whereClause = {};
    if (username) {
      whereClause.username = username;
    }
    if (email) {
      whereClause.email_address = email;
    }
    // Construct the order clause for sorting
    let orderClause = [];
    if (sortBy && sortOrder) {
      orderClause = [[sortBy, sortOrder]]; // e.g., [['createdAt', 'DESC']]
    }
    // Perform the query with filtering and sorting
    const users = await User.findAll({
      where: whereClause,
      order: orderClause,
      attributes: ["user_id", "username", "email_address", "admin"],
    });
    //return 200 if any results found, otherwise return 404
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "Can't find users" });
    }
  } catch (error) {
    res.status(500).json("Server error " + error.message);
  }
});

//create a new user (register)
//Passwords encrypted here
router.post("/register", async (req, res) => {
  try {
    console.log("method triggered");
    const { username, email, password } = req.body;

    //First, checking if the user already exists in the database
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email_address: email }],
      },
    });

    if (existingUser) {
      res.status(400).json({
        message: "User already exists",
      });
    } else {
      //if not, hash the password and store new user in the database and return a 201
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username: username,
        email_address: email,
        password: hashedPassword,
      });

      res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    }
  } catch (err) {
    res.status(500).json("Server error " + err.message);
  }
});

//Login to an account
router.post("/login", async (req, res) => {
  try {
    //first, getting the username and password sent and finding that user
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email_address: username }],
      },
    });

    //if no user matches, sent 401
    if (!user) {
      res.status(404).json("No user with that username or email address found");
    } else {
      //otherwise, compare entered password against stored password
      
      const hashedPassword = user.password;
      const passwordsMatch = await bcrypt.compare(password, hashedPassword);

      //if the passwords match, create a payload contaning userID and admin status
      if (passwordsMatch) {
        const payload = {
          id: user.user_id,
          admin: user.admin,
        };
        //sign the token with JWT using the payload created
        const token = jwt.sign(payload, "pokemonKey", { expiresIn: "1h" });

        //message to confirm admin status
        let message = "User credentials all valid. Logged in as basic user.";
        if (user.admin) {
          message = "Credentials accepted. Logged in as admin";
        }
        res.status(200).json({
          message: message,
          user: user,
          token: token,
        });
      } else {
        console.log("wrong password");
        res.status(401).json("Incorrect password");
      }
    }
  } catch (error) {
    res.status(500).json("Server error " + error.message);
  }
});

// Update a single user
router.put("/updatedetails", authenticateJWT, async (req, res) => {
  try {
    //retrieve the user id and fields to be changed from the params and body
    const { new_username, new_email, admin, user_id, password } = req.body;

    //first, authenticate whether the user is updating their own profile OR the user is an admin

    // Making sure that the user has entered information to update in at least 1 field
    if (new_username || new_email || admin) {
      //find the user profile to update
      const userToUpdate = await User.findByPk(user_id);

      if (!userToUpdate) {
        res.status(404).json("No user with that user ID found");
      } else {
        // Check password
        const storedPassword = userToUpdate.password;
        console.log(storedPassword)
        
        const passwordsMatch = await bcrypt.compare(password, storedPassword);
        if (passwordsMatch) {
          console.log(passwordsMatch)
          //update the user's inputted data with Sequelize
          await userToUpdate.update({
            username: new_username,
            email_address: new_email,
            admin: admin,
          });
          //reload to see changes and send 200 status
          await userToUpdate.reload();

          res.status(200).json({
            message: "User updated",
            updatedUser: userToUpdate,
          });
        } else {
          console.log("Wrong password")
          res.status(400).json("Wrong Password");
        }
      }
    } else {
      // catching the issue if no fields were entered
      res.status(400).json({
        message: "Please enter at least 1 field to update",
      });
    }
  } catch (err) {
    // Any other errors
    res.status(500).json("Server error " + err.message);
  }
});

// Change a user's password, accessible by the user or an admin
router.put("/changepassword", authenticateJWT, async (req, res) => {
  try {
   
    const { oldpassword, newpassword, user_id } = req.body;

    //checking that the user has access rights
   
      //making sure both fields have been filled in
      if (oldpassword && newpassword) {
        //find the user to update with sequelize
        const userToUpdate = await User.findByPk(user_id);

        if (!userToUpdate) {
          res.status(404).json({
            message: "Can't find that user",
          });
        }
        //if user found, compare old password to the stored password
        const hashedPassword = userToUpdate.password;
        const passwordsMatch = await bcrypt.compare(
          oldpassword,
          hashedPassword
        );

        //if they match, update the database with new encrypted password
        if (passwordsMatch) {
          const newHashedPassword = await bcrypt.hash(newpassword, 10);
          await userToUpdate.update({ password: newHashedPassword });
          await userToUpdate.reload();
          res.status(200).json({
            message: "Password changed succesfully",
            updatedUser: userToUpdate,
          });
        } else {
          res.status(400).json(
            "Old password incorrect",
          );
        }
      } else {
        res.status(400).json(
         "Old and new password need to be entered",
        );
      }
   
  } catch (err) {
    res.status(500).json("Server error " + err.message);
  }
});

router.delete("/delete/:userid", authenticateJWT, async (req, res) => {
  try {
    const userid = req.params.userid;
    if (req.user.id == userid || req.user.admin) {
      const userToDelete = await User.findByPk(userid);
      if (!userToDelete) {
        res.status(404).json({
          message: "Can't find that user to delete",
        });
      } else {
        await userToDelete.destroy();
        res.status(200).json({
          message: "User deleted succesfully",
          user: userToDelete,
        });
      }
    } else {
      res.status(401).json({
        message: "Not authorised to delete this account",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Internal server error: ${err.message}`,
    });
  }
});

module.exports = router;

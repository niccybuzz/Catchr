//A series of rountes for user related endpoints
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateJWT = require("../auth/authenticateJWT");

const User = require("../models/User");
const Collection = require("../models/Collection");
const Comment = require("../models/Comment");
const Like = require("../models/Like");
const { Op } = require("sequelize");
const router = express.Router();

// Get a single user by ID
router.get("/:userid", async (req, res) => {
  let userId = req.params.userid;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("Can't find that user by id");
    }
  } catch (err) {
    res.status(500).json(err);
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

      console.log(newUser);

      const newCollection = await Collection.create({
        user_id: newUser.user_id,
      });

      res.status(201).json(newUser);
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
router.put("/details", authenticateJWT, async (req, res) => {
  try {
    //retrieve the user id and fields to be changed from the params and body
    const { new_username, new_email, admin, password } = req.body;
    const user_id = req.user.id;
    //first, authenticate whether the user is updating their own profile OR the user is an admin

    // Making sure that the user has entered information to update in at least 1 field
    if (new_username || new_email || admin) {
      //find the user profile to update
      const userToUpdate = await User.findByPk(user_id);
      let updateClause = {};
      if (new_username) {
        updateClause.username = new_username;
      }
      if (new_email) {
        updateClause.email_address = new_email;
      }
      if (admin) {
        updateClause.admin = admin;
      }
      console.log(updateClause);

      if (!userToUpdate) {
        res.status(404).json("No user with that user ID found");
      } else {
        // Check password
        const storedPassword = userToUpdate.password;

        const passwordsMatch = await bcrypt.compare(password, storedPassword);
        if (passwordsMatch) {
          //update the user's inputted data with Sequelize
          await userToUpdate.update(updateClause);
          console.log("Success");
          //reload to see changes and send 200 status
          await userToUpdate.reload();

          res.status(200).json({
            message: "User updated",
            updatedUser: userToUpdate,
          });
        } else {
          console.log("Wrong password");
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
router.put("/password", authenticateJWT, async (req, res) => {
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
      const passwordsMatch = await bcrypt.compare(oldpassword, hashedPassword);

      //if they match, update the database with new encrypted password
      if (passwordsMatch) {
        const newHashedPassword = await bcrypt.hash(newpassword, 10);
        await userToUpdate.update({ password: newHashedPassword });
        await userToUpdate.reload();
        res.status(200).json(userToUpdate);
      } else {
        res.status(400).json("Old password incorrect");
      }
    } else {
      res.status(400).json("Old and new password need to be entered");
    }
  } catch (err) {
    res.status(500).json("Server error " + err.message);
  }
});

router.delete("/:userid", authenticateJWT, async (req, res) => {
  try {
    const userid = req.params.userid;
    if (req.user.id == userid || req.user.admin) {
      const userToDelete = await User.findByPk(userid);
      if (!userToDelete) {
        res.status(404).json("Can't find that user to delete");
      } else {
        const collectionToDelete = await Collection.findOne({
          where: {
            user_id: userid,
          },
        });

        const commentsToDelete = await Comment.findAll({
          where: {
            user_id: userid,
          },
        });
        const likesToDelete = await Like.findAll({
          where: {
            user_id: userid
          }
        })
        const commentsOnCollection = await Comment.findAll({
          where: {
            collection_id: collectionToDelete.collection_id
          }
        })
        const likesOnCollection = await Like.findAll({
          where: {
            collection_id : collectionToDelete.collection_id
          }
        })
      
        //Cant use forEach here because requires async
        for (const comment of commentsToDelete) {
          await comment.destroy();
        }
        for (const comment of commentsOnCollection) {
          await comment.destroy();
        }
        for (const like of likesToDelete) {
          await like.destroy();
        }  
        for (const like of likesOnCollection) {
          await like.destroy();
        }            
        await collectionToDelete.destroy();
        await userToDelete.destroy();
        
        res.status(200).json("Account deleted succesfully");
      }
    } else {
      res.status(401).json("Not authorised to delete this account",);
    }
  } catch (err) {
    res.status(500).json(`Internal server error: ${err}`);
  }
});

module.exports = router;

//A series of rountes for user related endpoints
const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const { DataTypes, Op } = require("sequelize");
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
    });

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
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email_address: username }],
      },
    });

    if (!user) {
      res.status(404).json({
        message: "No user with those email address or username found",
      });
    }

    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordsMatch) {
        res.status(200).json({
          message: "User credentials all valid",
          user: { user },
        });
    }
  } catch (error) {
    res.status(500).json("Server error " + error.message);
  }
});

// Update a single user
router.put("/:userid", async (req, res) => {
  try {
    const userid = req.params.userid;
    const { new_username, new_email, admin } = req.body;

    const userToUpdate = await await User.findByPk(userid);
    if (!userToUpdate) {
      res.status(404).json({
        message: "No user with those email address or username found",
      });
    }

    await userToUpdate.update({
      username: new_username,
      email_address: new_email,
      admin: admin,
    });
    await userToUpdate.reload();

    res.status(200).json({
      message: "User updated",
      updatedUser: userToUpdate,
    });
  } catch (err) {
    res.status(500).json("Server error " + err.message);
  }
});



router.put("/changepassword/:userid", async (req, res) => {
  try {
    const userid = req.params.userid;
    const { oldpassword, newpassword } = req.body;

    if (oldpassword && newpassword) {
      const userToUpdate = await User.findByPk(userid);

      if (!userToUpdate) {
        res.status(404).json({
          message: "Can't find that user",
        });
      }
  
      const hashedPassword = userToUpdate.password;
      const passwordsMatch = await bcrypt.compare(oldpassword, hashedPassword);
  
      if (passwordsMatch) {
        const newHashedPassword = await bcrypt.hash(newpassword, 10);
        await userToUpdate.update({ password: newHashedPassword });
        await userToUpdate.reload();
        res.status(200).json({
          message: "Password changed succesfully",
          updatedUser: userToUpdate,
        });
      } else {
        res.status(400).json({
          message: "Old password incorrect"
        })
      }
    } else {
      res.status(400).json({
        message: "Old and new password required for validation"
      })
    }


  } catch (err) {
    res.status(500).json("Server error " + err.message);
  }
});



module.exports = router;

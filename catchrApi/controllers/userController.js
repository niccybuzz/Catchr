// Controller to manage user operations for API
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

//Full list of users
exports.getAllUsers = async (req, res) => {
  try {
    const Users = await User.findAll();
    res.status(200).json(Users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//Registration, handled using bcrypt
exports.registerUser = async (username, email, password) => {
  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email_address: email }],
      },
    });

    if (existingUser) {
      throw new Error("Username or email already exists'");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      email_address: email,
      password: hashedPassword,
    });

    return newUser;
  } catch (error) {
    throw new Error(`Error registering user: ${error.message}`);
  }
};

//Route for logging in.
exports.loginUser = async (username, password, response) => {
  try {
    //First, find the user in the database
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email_address: username }],
      },
    });
    //If not match, throw an error
    if (!user) {
      throw new Error("Couldn't find any users with that email/username");
    }

    //Otherwise, get the stored password and compare to entered password
    const hashedPassword = user.password;

    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    console.log(passwordsMatch);
    if (passwordsMatch) {
      return user;
    } else {
      throw new Error("Passwords don't match");
    }
  } catch (err) {
    throw new Error(`Couldn't log in user: ${err.message}`);
  }
};

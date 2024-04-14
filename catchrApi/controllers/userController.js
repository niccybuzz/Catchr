// Controller to manage user operations for API
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Collection = require("../models/Collection");
const { DataTypes, Op } = require("sequelize");

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

exports.getUserWithCollections = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Collection, // Include the Collection model
      },
    });
    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSingleUserWithCollections = async (userid) => {
  try {
    const user = await User.findByPk(userid, {
      include: {
        model: Collection, // Include the Collection model
      },
    });
    return { user: user, statusCode: 200 };
  } catch (err) {
    throw new Error(`Error getting user: ${err.message}`);
  }
};

exports.getUserById = async (userId) => {
  try {
    const foundUser = await User.findByPk(userId);
    if (!foundUser) {
      return { user: null, statusCode: 404, message: "User not found" }; // User not found
    }
    return { user: foundUser, statusCode: 200 }; // User found
  } catch (err) {
    throw new Error(`Error getting user: ${err.message}`);
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
      return {
        statusCode: 400,
        message: "User already exists",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      email_address: email,
      password: hashedPassword,
    });

    return {
      user: newUser,
      statusCode: 200,
      message: "User create successfully",
    };
  } catch (error) {
    return {
      result: { message: "Unable to create user", statusCode: 500 },
    };
  }
};

//Route for logging in.
exports.loginUser = async (username, password) => {
  try {
    //First, find the user in the database
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email_address: username }],
      },
    });
    //If not match, throw an error
    if (!user) {
      return {
        statusCode: 400,
        message: "User details not found",
      };
    }
    //Otherwise, get the stored password and compare to entered password
    const hashedPassword = user.password;

    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    console.log(passwordsMatch);
    if (passwordsMatch) {
      return {
        statusCode: 200,
        user: user,
        message: "User logged in sucessfully",
      };
      return user;
    } else {
      return {
        statusCode: 400,
        message: "Passwords dont match",
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      message: `${error.message}`,
    };
  }
};

exports.updateUser = async (userid, username, email, admin) => {
  try {
    const userToUpdate = await User.findByPk(userid);
    if (!userToUpdate) {
      return {
        statusCode: 404,
        message: "Can't find user",
      };
    }
    await userToUpdate.update({
      username: username,
      email_address: email,
      admin: admin,
    });
    await userToUpdate.reload();
    return {
      message: "User updated successfully",
      user: userToUpdate,
    };
  } catch (error) {
    throw new Error("Error updating user");
  }
};

exports.updatePassword = async (user_id, oldpassword, newpassword) => {
  try {
    const userToUpdate = await User.findByPk(user_id);
    if (!userToUpdate) {
      throw new Error("Can't find that collection");
    }
    const hashedPassword = userToUpdate.password;

    const passwordsMatch = await bcrypt.compare(oldpassword, hashedPassword);

    if (passwordsMatch) {
      const newHashedPassword = await bcrypt.hash(newpassword, 10);
      await userToUpdate.update({ password: newHashedPassword });
      await userToUpdate.reload();
      return userToUpdate;
    } else {
      throw new Error("Passwords don't match");
    }
  } catch (error) {
    throw new Error(`Error updating collection: ${error.message}`);
  }
};

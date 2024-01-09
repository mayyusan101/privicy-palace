const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10; // the more greater, the more it longs
const { generateAccessToken } = require("../config/token");
const { default: mongoose } = require("mongoose");

const login = async (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  try {
    const loginUser = await User.findOne({ name: name });
    if (!loginUser) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    const isMatch = bcrypt.compare(password, loginUser.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    const newToken = generateAccessToken(loginUser.name); // regenerate token
    const updatedUser = await User.findOneAndUpdate(
      { _id: loginUser._id },
      { token: newToken },
      { new: true }
    );
    res
      .status(200)
      .json({
        message: "Login success",
        data: { user: updatedUser, token: newToken },
      });
  } catch (err) {
    const error = new Error(err);
    error.message = "Can't login account";
    return next(error);
  }
};

const register = async (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  if (!name || !password) {
    return res
      .status(422)
      .json({ message: "Name and password are required!" });
  }
  try {
    const isUserExist = await User.findOne({ name });
    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash password
    const hashedPasswrod = await bcrypt.hash(password, saltRounds);
    const token = generateAccessToken(name); // generate token
    const userData = {
      name,
      password: hashedPasswrod,
      token: token,
    };
    const user = await User.create(userData);
    res
      .status(201)
      .json({
        message: "Register success",
        data: { user: user, token: user.token },
      });
  } catch (err) {
    const error = new Error(err);
    error.message = "Can't create account";
    return next(error);
  }
};


module.exports = {
  login,
  register
};


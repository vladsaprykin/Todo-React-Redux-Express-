const User = require("../models/user");
const Task = require("../models/task");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configJwt = require("../config/jwtConfig");

exports.get_user = async (req, res, next) => {
  try {
    const email = req.body.email;
    const passwordEnteredByUser = req.body.password;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Wrong login" });
    }
    const isPassValid = bcrypt.compareSync(
      passwordEnteredByUser,
      user.password
    );
    if (!isPassValid) {
      return res.status(400).send({ error: "Wrong password" });
    }
    const token = jwt.sign({ _id: user._id }, configJwt.secretKey, {
      expiresIn: "1h",
    });
    return res.json({
      token,
      user: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Server error" });
  }
};
exports.add_user = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordFromUser = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const passwordToSave = bcrypt.hashSync(passwordFromUser, salt);
  const filterUserName = await User.find({ username: username }).exec();
  if (filterUserName.length) {
    return res.status(400).send({ error: "This username is already used" });
  }
  const filterMail = await User.find({ email: email }).exec();
  if (filterMail.length) {
    return res.status(400).send({ error: "This email is already used" });
  }
  const user = new User({
    username,
    email,
    password: passwordToSave,
  });
  try {
    await user.save();
    res.send({ done: "add user" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Server error" });
  }
};
exports.get_user_token = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const token = jwt.sign({ _id: user._id }, configJwt.secretKey, {
      expiresIn: "1h",
    });
    return res.json({
      token,
      user: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (e) {
    res.status(500).send({ error: "Server error" });
  }
};
exports.delete_user = async (req, res, next) => {
  try {
    const userId = req.user._id;
    User.findOne({ _id: userId }, function (err, user) {
      if (err) throw err;
      user.remove();
    });
    res.send({ message: "Delete user" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Server error" });
  }
};

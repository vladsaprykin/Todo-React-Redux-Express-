const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.get_user = async function (req, res, next) {
  const login = req.body.email;
  const passwordEnteredByUser = req.body.password;
  await User.findOne({ login }, function (err, user) {
    if (err) return next(err);
    if (user === null) return res.status(400).send({ error: "Wrong login" });
    bcrypt
      .compare(passwordEnteredByUser, user.password)
      .then(function (result) {
        if (result) res.send(user);
        if (!result) res.status(400).send({ error: "Wrong password" });
      });
  }).exec();
};
exports.add_user = async function (req, res, next) {
  const username = req.body.username;
  const login = req.body.email;
  const passwordFromUser = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const passwordToSave = bcrypt.hashSync(passwordFromUser, salt);
  const filterUserName = await User.find({ username: username }).exec();
  if (filterUserName.length)
    return res.status(400).send({ error: "This username is already used" });
  const filterMail = await User.find({ login: login }).exec();
  if (filterMail.length)
    return res.status(400).send({ error: "This email is already used" });
  const user = new User({
    username,
    login,
    password: passwordToSave,
  });
  await user.save(function (err, result) {
    if (err) {
      return next(err);
    }
    res.send(result);
  });
};

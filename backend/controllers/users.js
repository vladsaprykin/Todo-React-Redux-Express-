const User = require('../models/user');
var bcrypt = require('bcrypt');

exports.get_user = async function (req, res, next) {
	const login = req.body.email;
	const passwordEnteredByUser = req.body.password
	await User.findOne({ login : login },function (err, adventure) {
		if (err) return next(err);
		if (adventure === null) return res.status(400).send({error: 'Wrong login'});
		bcrypt.compare(passwordEnteredByUser, adventure.password).then(function(result) {
			console.log(result)
			if (result) res.send(adventure)
			if (!result) res.status(400).send({error: 'Wrong password'})
		});
	}).exec();
}
exports.add_user = async function (req, res, next) {
	const userName = req.body.username;
	const login = req.body.email;
	const passwordFromUser = req.body.password;
	const salt = bcrypt.genSaltSync(10);
	const passwordToSave = bcrypt.hashSync(passwordFromUser, salt);
	const filterUserName = await User.find({username: userName}).exec();
	if (filterUserName.length) return res.status(400).send({error: 'This username is busy'});
	const filterMail = await User.find({login: login }).exec();
	if (filterMail.length) return res.status(400).send({error: 'This email is busy'});
	const user = new User({
		username: userName,
		login: login,
		password: passwordToSave,
	});
	user.save(function (err, result) {
		if (err) {
			return next(err);
		}
		res.send(result)
	})
}
var express = require('express');
const users_controller = require('../controllers/users');
var router = express.Router();

router.post('/', users_controller.get_user);
router.post('/create/', users_controller.add_user);


module.exports = router;
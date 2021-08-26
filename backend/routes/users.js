var express = require("express");
const users_controller = require("../controllers/users");
var router = express.Router();
const authMiddleware = require("../middleWare/auth.middleware");

router.post("/login/", users_controller.get_user);
router.post("/create/", users_controller.add_user);
router.get("/auth/", authMiddleware, users_controller.get_user_token);
module.exports = router;

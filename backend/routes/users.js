const express = require("express");
const users_controller = require("../controllers/users");
let router = express.Router();
const authMiddleware = require("../middleWare/auth.middleware");

router.post("/login/", users_controller.get_user);
router.post("/create/", users_controller.add_user);
router.get("/auth/", authMiddleware, users_controller.get_user_token);
router.get("/delete/", authMiddleware, users_controller.delete_user);
module.exports = router;

const jwt = require("jsonwebtoken");
const configJwt = require("../config/jwtConfig");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(401).json({ message: "Auth error" });
    }
    const decoded = jwt.verify(token, configJwt.secretKey);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Auth error" });
  }
};

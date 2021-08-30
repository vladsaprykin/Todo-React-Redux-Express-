const jwt = require("jsonwebtoken");
const configJwt = require("../config/jwtConfig");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token === "undefined" || !token) {
      return res.status(401).json({ message: "Missing token" });
    }
    const decoded = await jwt.verify(token, configJwt.secretKey);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Auth error" });
  }
};

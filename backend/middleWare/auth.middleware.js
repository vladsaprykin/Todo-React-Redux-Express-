const jwt = require("jsonwebtoken");
const configJwt = require("../config/jwtConfig");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Auth error" });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, configJwt.secretKey);
    } catch (e) {
      return res.status(401).json({ message: "Auth error" });
    }
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Auth error" });
  }
};

const jwt = require("jsonwebtoken");

// token verification using headers - CURRENTLY NOT IN USE
const verifyAuth = function(req, res, next) {
  console.log("Checking for token: " + req.header("auth-token"));

  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    req.status(400).send("Invalid token");
  }
};

module.exports = verifyAuth;

const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  console.log("Checking for token: " + req.cookies.token);
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;

  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
    console.log("no token");
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
        console.log("Invalid token");
      } else {
        console.log("Valid token, access granted");
        req._id = decoded._id;
        next();
      }
    });
  }
};

module.exports = checkAuth;

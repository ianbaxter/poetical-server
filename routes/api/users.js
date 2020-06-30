const router = require("express").Router();

// Load user model
const User = require("../../model/User");

// @route GET api/users
// @description Check if a username exists and retun their id
// @access Public
router.get("/", (req, res) => {
  console.log("Checking for user: " + req.query.username);
  User.findOne({ username: req.query.username })
    .then((user) => {
      if (user === null) {
        console.log("User does not exist");
        res.sendStatus(404);
      } else {
        res.json(user.id);
      }
    })
    .catch((err) => {
      console.log("Error checking user: " + err);
      res.sendStatus(404);
    });
});

module.exports = router;

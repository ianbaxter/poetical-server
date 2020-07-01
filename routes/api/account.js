const router = require("express").Router();
const bcrypt = require("bcryptjs");
const {
  changeEmailValidation,
  changeUsernameValidation,
  changePasswordValidation,
} = require("../../validation");

// Load user model
const User = require("../../model/User");
const Post = require("../../model/Post");

// @route GET api/account
// @description Get a single user
// @access Public
router.get("/:id", (req, res) => {
  console.log("Getting single user");
  User.findById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(404).json({ Error: "No user was found" });
    });
});

// @route PUT api/account
// @description Update user
// @access Public
router.put("/:id", async (req, res) => {
  console.log("Updataing userId: " + req.params.id);
  // Validate data
  if (req.body.email !== undefined) {
    const { error } = changeEmailValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email must be unique");
  } else if (req.body.username !== undefined) {
    const { error } = changeUsernameValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const usernameExist = await User.findOne({ username: req.body.username });
    if (usernameExist) return res.status(400).send("Username must be unique");
  } else if (req.body.password !== undefined) {
    const { error } = changePasswordValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }

  User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => {
      res.json(user);
      //   res.json({ msg: "User updated successfully" });
    })
    .catch((err) => {
      res.status(404).json({ Error: "No such user exists" });
    });
});

// @route PUT api/account
// @description Update all posts from one user
// @access Public
router.put("/", (req, res) => {
  console.log("Update all posts");
  Post.updateMany(
    { username: req.body.username },
    { username: req.body.newUsername }
  )
    .then((posts) => res.json({ msg: "Posts updated successfully" }))
    .catch((err) => res.status(404).json({ error: "No posts were found" }));
});

module.exports = router;

const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../../validation");

// Load user model
const User = require("../../model/User");

// @route POST api/auth/register
// @description Register new user
// @access Public
router.post("/register", async (req, res) => {
  // Validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user already in DB
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email must be unique");
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) return res.status(400).send("Username must be unique");

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.sendStatus(200);
  } catch (error) {
    res.status(400).send(err);
  }
});

// @route POST api/auth/login
// @description Login existing user
// @access Public
router.post("/login", async (req, res) => {
  // Validate data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user already in DB
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Email is invalid");
  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password is invalid");

  // Issue token
  const payload = { email };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res
    .cookie("token", token, { httpOnly: true })
    .status(200)
    .send({ username: user.username, userId: user._id });
});

module.exports = router;

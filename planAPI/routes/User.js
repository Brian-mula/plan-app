const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json("user registered successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// user login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validpassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validpassword && res.status(400).json("wrong password");
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

// find a user

router.get("/user/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;

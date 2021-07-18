const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

// update a user

router.put("/user/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("user updated successfully");
    } catch (error) {
      res.status(500).json(e);
    }
  } else {
    res.status(404).json("you dont own this account");
  }
});

// delete a user
router.delete("/user/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.send("you dont own this account");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Plan = require("../models/plan");
const User = require("../models/user");

// create a plan
router.post("/create", async (req, res) => {
  const newplan = new Plan(req.body);
  try {
    await newplan.save();
    res.status(200).json("plan created successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
// update plans
router.put("/plan/:id", async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (plan.userId === req.body.userId) {
      await plan.updateOne({ $set: req.body });
      res.status(200).json("updation was successfull");
    } else {
      res.status(404).json("you dont own this account");
    }
  } catch (error) {
    res.staus(500).json(error);
  }
});

// delete a plan
router.delete("/plan/:id", async (req, res) => {
  const plan = await Plan.findById(req.params.id);
  try {
    if (plan.userId === req.body.userId) {
      await plan.deleteOne();
      res.status(200).json("deletion was successfull");
    } else {
      res.status(404).json("you dont own this account");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// get plans for a specific user
router.get("/projects/:userId", async (req, res) => {
  try {
    const currentuser = await User.findById(req.params.userId);

    const plans = await Plan.find({ userId: currentuser._id });
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

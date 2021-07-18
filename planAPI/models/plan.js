const mongoose = require("mongoose");
// const schema = mongoose.Schema();

const PlanShema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
    unique: true,
  },
  value: {
    type: Number,
    require: true,
  },
  duration: {
    type: String,
    require: true,
  },
  photo: {
    type: String,
    require: true,
  },
},
 { timestamps: true }
);
const Plan = mongoose.model("plan", PlanShema);
module.exports = Plan;

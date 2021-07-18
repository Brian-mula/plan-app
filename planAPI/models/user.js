const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    min: 6,
  },
});
const User = mongoose.model("user", UserSchema);

module.exports = User;

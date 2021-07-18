const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const createRoute = require("./routes/plans");
const userRoutes = require("./routes/User");
const authRoutes = require("./routes/Auth");

const app = express();

// intialize dotenv
dotenv.config();

// connect to mongoose
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connections have been made to mongodb");
  }
);

// middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// create routes
app.use("/api/", authRoutes);
app.use("/api/", userRoutes);
app.use("/api/", createRoute);

app.listen(9000, () => {
  console.log("you are listening to port 9000");
});

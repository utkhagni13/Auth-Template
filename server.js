const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./controller/users");
const app = express();
const cors = require("cors");

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = require("./config/devConfig").mongoDbURL;
// Connect to MongoDB
mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.log(err);
    else console.log("Successfully connected to Database!!!");
  }
);
mongoose.set("useFindAndModify", false);

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/users", users);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

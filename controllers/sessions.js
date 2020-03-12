const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/users.js");
const Appointment = require("../models/appointment.js");
const appointmentController = require("../controllers/appointment.js");
router.use("/app", appointmentController);

router.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

// after we create the new session, redirect use to Appointment index page.
router.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      //res.redirect("/");
      res.redirect("/app");
    } else {
      // res.send("wrong password");
      res.render("sessions/new.ejs");
    }
  });
});

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Appointment = require("../models/appointment.js");
const bcrypt = require("bcrypt");

/** Create new users */
router.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

router.post("/", (req, res) => {
    // username in all lowercase
    req.body.username = req.body.username.toLowerCase();
    
    // encrypt the password before creating record in the database.
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  User.create(req.body, (err, createdUser) => {
    res.redirect("/");
  });
});

/** INDEX Route
 * Show all appointments
 */
router.get("/users", (req, res) => {
  res.render("./views/users/volunteer/index.ejs");
})

/**
 * SHOW Route - show all appointments for the
 * specified volunteer
 * pull user's unique id or username from the req.body
 * use that as key in the Appointments document
 */

 router.get("/:username", (req,res) => {
  //  res.send("User Show Route reached");
   
    Appointment.find(
      { creator: req.params.username },
       (err, foundAppts) => {
        //  res.send(foundAppts);
     res.render("../views/users/volunteer/show.ejs",
      { 
        allAppts: foundAppts,
        username: req.params.username
      });
   });
 });

module.exports = router;
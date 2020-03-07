const express = require("express");
const router = express.Router();

const Appointment = require("../models/appointment.js");
const seedData = require("../models/seed_appointment.js");


/**
 * NEW Route - display page to capture new appointment data
 */

 router.get("/new", (req, res) => {
    //  res.send("On my way to the new appt screen!");
    res.render("../views/appointment/new.ejs");
 })

/**
 * CREATE - Store new appointment in the database
 */

 router.post("/", (req, res) => {
     // have to pull the user name from the session
     // to store in the database.

     req.body.creator = req.session.currentUser.username;
     console.log(req.body);
     Appointment.create(req.body, (error, result) =>{
         res.redirect("/users");
        // console.log(error);
        // res.send("back from the database");
     })
 })
 
 /**
  * SEED ROUTE - push items into the database for testing
  */
 router.get("/app/seed", (req,res) => {
    Appointment.insertMany(seedData, (err, appointments) => {
        if (err) { 
            console.log(`Error Seeding the Database: ${err}`);
        } else {
            console.log("Added appointment data provided", appointments);
            console.log(appointments);
            
        }
        //res.redirect("/products");
        res.send("Appointments Seeding Executed!");
    });
 });
 
/** 
 * SHOW route - Display Details of a single appointment
 */

 router.get("/:id", (req, res) => {
     Appointment.findById(req.params.id, (err, foundAppt) =>{
        //  res.send(`successfully found the appt ${foundAppt}`);
        res.render("../views/appointment/show.ejs",
        { appt: foundAppt });
     });
 });

module.exports = router;
const express = require("express");
const router = express.Router();

const Appointment = require("../models/appointment.js");
const seedData = require("../models/seed_appointment.js");





 
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
 


module.exports = router;
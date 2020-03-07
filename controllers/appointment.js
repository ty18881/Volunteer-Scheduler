const express = require("express");
const router = express.Router();

const Appointment = require("../models/appointment.js");
const seedData = require("../models/seed_appointment.js");


/**
 * UPDATE/EDIT  - Displays page where we can edit an appointment
 */

router.get("/:id/edit", (req, res) => {
    Appointment.findById(req.params.id, (err, foundAppointment) => {
        res.render("../views/appointment/edit.ejs", {
            appt: foundAppointment
        });
    });
});

/**
 * UPDATE - PUT the revised data into the datebase.
 */

 router.put("/:id", (req, res) => {
    Appointment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, updateModel) => {
            res.redirect(`/app/${req.params.id}`);
        }
    )
})
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

 /**
  * INDEX Route - Display all appointments
  */

  router.get("/", (req,res) => {
    //   res.send("Hitting the Appt Index route");
    Appointment.find( 
                {},
                (error, usrAppt) => {
                  // console.log(usrAppt);
                  // console.log("Error: ", error);
                  res.render("../views/users/volunteer/index.ejs", 
                    { apptList: usrAppt}
                );
                }
              )
  });


 /**
 * DELETE Route - remove item from the datastore
 */

router.delete("/:id", (req, res) =>{
    console.log("Hitting the Delete route");
    Appointment.findByIdAndRemove(req.params.id, (err, prodData) =>{
        res.redirect("/app");
    });
});

module.exports = router;
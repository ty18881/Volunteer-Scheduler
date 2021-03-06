const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");


const Appointment = require("../models/appointment.js");
const seedData = require("../models/seed_appointment.js");


/**
 * UPDATE/EDIT  - Displays page where we can edit an appointment
 */

router.get("/:id/edit", (req, res) => {
    if (req.session.currentUser) {
        Appointment.findById(req.params.id, (err, foundAppointment) => {
            res.render("../views/appointment/edit.ejs", {
                appt: foundAppointment,
                username: req.session.currentUser.username
            });
        });
    } else {
        res.redirect("/sessions/new");
    }
});

/**
 * UPDATE - PUT the revised data into the datebase.
 */

 router.put("/:id", (req, res) => {
    let tempDate = moment(req.body.date).tz("America/New_York");
    req.body.date = tempDate;
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
    if (req.session.currentUser) {
        res.render("../views/appointment/new.ejs",
        {creator: req.body.creator,
            username: req.session.currentUser.username
        });
    } else {
        res.redirect("/sessions/new");
    }
 });

/**
 * CREATE - Store new appointment in the database
 */

 router.post("/", (req, res) => {
     // have to pull the user name from the session
     // to store in the database.

     req.body.creator = req.session.currentUser.username;
     // think we have to put a timezone on the date here.
    
    let tempDate = moment(req.body.date).tz("America/New_York");
    req.body.date = tempDate;
    
     Appointment.create(req.body, (error, result) =>{
         
         res.redirect("/app");
         
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
    if (req.session.currentUser) {
        Appointment.findById(req.params.id, (err, foundAppt) =>{
            
            // do not permit users to edit reservations made by other users.
            let canEdit = false;
            foundAppt.creator === req.session.currentUser.username ? canEdit = true : canEdit = false;
            res.render("../views/appointment/show.ejs",
            { appt: foundAppt,
                canEdit: canEdit,
                username: req.session.currentUser.username
            });
        });
    } else {
        res.redirect("/sessions/new");
    }

 });

 /**
  * INDEX Route - Display all appointments
  */

  router.get("/", (req,res) => {
    if (req.session.currentUser) {
        Appointment.find( 
                    {},
                    (error, usrAppt) => {
                    // console.log(usrAppt);
                    // console.log("Error: ", error);
                    res.render("../views/appointment/index.ejs", 
                        { apptList: usrAppt,
                        username: req.session.currentUser.username}
                    );
                    }
                )
                } else {
                    res.redirect("/sessions/new");
                }
  });


 /**
 * DELETE Route - remove item from the datastore
 */

router.delete("/:id", (req, res) =>{
    if (req.session.currentUser) {
        console.log("Hitting the Delete route");
        Appointment.findByIdAndRemove(req.params.id, (err, prodData) =>{
            res.redirect("/app");
        });
    } else {
        res.redirect("/sessions/new");
    }
});

module.exports = router;
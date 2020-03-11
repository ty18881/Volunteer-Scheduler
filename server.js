/**
 * Project Two - Online Volunteer Scheduler
 * Technologies: node.js, express, mongoose
 */

 /**
  * Basic elements.
  */
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const session = require("express-session");
const moment = require("moment-timezone");



// adding this to see if we can redirect from this page to our
// app controller.

const appt = require("./controllers/appointment.js");

const app = express();


// I want moment to be visible across all the controllers

app.locals.moment = moment;
/**
 * Our port
 */
const port = 3000;

/** MIDDLEWARE */

// enables us to read from the request payload
app.use(express.urlencoded({extended:true}));

// enables UPDATE and DELETE routes
app.use(methodOverride("_method"));

// enables session management
app.use(
    session({
      secret: "feedmeseymour", //some random string
      resave: false,
      saveUninitialized: false
    })
  );

  
/** Database connectivity */
mongoose.connect('mongodb://localhost:27017/volunteer-scheduler', { 
    useNewUrlParser: true,
    useUnifiedTopology: true});
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

/**
 * Models
 */

const Appointment = require("./models/appointment.js");
const seedData = require("./models/seed_appointment.js");
// const User = require("../models/user.js");

/**
 * Controllers
 */

const usersController = require("./controllers/users.js");
app.use("/users", usersController);

const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);

const appointmentController = require("./controllers/appointment.js");
app.use("/app", appointmentController);

/**
 * Public Sources
 */
app.use(express.static('public'));


  
  app.get("/app/seed", (req, res) => {
    
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


  app.get("/", (req, res) => {
    res.render("index.ejs", {
      currentUser: req.session.currentUser
    });
  });





 /**
  * LISTENER
  */

 app.listen(port, () => {
    console.log("Server Up and Listening");
});
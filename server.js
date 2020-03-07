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

const app = express();
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

// const Product = require("./models/products.js");
// const seedData = require("./models/seed_products.js");
// const User = require("../models/user.js");

/**
 * Controller
 */
// const productsController = require("./controllers/products.js");

// any request for fruits route get directed to the fruitsController.
// app.use("/products", productsController);

/**
 * Public Sources
 */
app.use(express.static('public'));

app.get("/app", (req, res) => {
    if (req.session.currentUser) {
      res.send("the party");
    } else {
      res.redirect("/sessions/new");
    }
  });
  
  app.get("/", (req, res) => {
    res.render("index.ejs", {
      currentUser: req.session.currentUser
    });
  });

const usersController = require("./controllers/users.js");
app.use("/users", usersController);

const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);


 /**
  * LISTENER
  */

 app.listen(port, () => {
    console.log("Server Up and Listening");
});
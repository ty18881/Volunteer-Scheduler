# Volunteer-Scheduler

## Connecting volunteers with opportunities in their school community.
https://stormy-springs-89797.herokuapp.com/

### Technologies used in this application
1.  bcrypt - password encryption
2.  Bootstrap
3.  EJS and EJS partials
4.  Express
5.  Javascript
6.  Moment - date formatting
7.  Mongoose
8.  Node.js

### Development Approach
We started out with two user personas
1.  Volunteer jobs to be done
    1.  Schedule themselves to volunteer
    2.  See their existing appointments/volunteer obligations
    3.  Cancel an existing appointment
    4.  See where other volunteers have appointments.

2.  Teacher jobs to be done.
    1. Specify times where help IS NOT required/welcome
    2. See who is scheduled to volunteer

**This MVP implements Volunteer jobs to be done only.**

MVP contains seven REST routes for the Volunteer persona as well as a mechanism for creating new volunteer user accounts and authenticating existing users.

### Enhancements in the backlog
1.  REST routs for the Teacher
2.  Modify Volunteer INDEX route to resemble a calendar
![Target Index Route](/images/aspirationalIndexRoute.jpg)
3.  Implement flash messages to display user prompts.
4.  Fix positioning of login button on smaller displays
5.  Automatically log in newly created users
6.  Restyle SHOW route - show other volunteers for the same day
![Target Show Route](/images/showRouteEnhancement.jpg)





const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date:  { type: Date, required: true },
    start_time: Number,
    end_time: Number,
    creator: String
}, {timestamps: true});

// this tells mongoose what to name the new collection if/when it creates one.
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
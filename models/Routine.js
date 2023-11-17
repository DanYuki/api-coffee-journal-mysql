const mongoose = require('mongoose')

const RoutineModel = new mongoose.model("Routine", mongoose.Schema({
    date: Date,
    waterWeight: Number,
    coffeeWeight: Number,
    coffeeType: String,
    waterTemp: Number,
    brewTime: Number,
    notes: {
        type: String,
        default: 'No additional notes'
    }
}), 'coffeeJournal')

module.exports = {RoutineModel};
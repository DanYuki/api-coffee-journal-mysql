const mongoose = require('mongoose');

const CoffeeModel = new mongoose.model("Coffee", mongoose.Schema({
    name: String,
    boughtDate: Date,
    roast: String,
    tasteProfile: [String],
    price: Number,
    productLink: String,
    weight: Number
}));

module.exports = {CoffeeModel};
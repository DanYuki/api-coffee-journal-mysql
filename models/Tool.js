const mongoose = require('mongoose')

const ToolModel = new mongoose.model('Tool', mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    productLink: String,
    condition: {
        type: String,
        default: "Usable"
    }
}))

module.exports = {ToolModel}
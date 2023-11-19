const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const URL = require('url').URL;

const { RoutineModel } = require('./models/Routine');
const { ToolModel } = require('./models/Tool');
const {CoffeeModel} = require('./models/Coffee');

main();

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch(err) {
        console.error("Error has occurred : " + err);
    }
}

const urlValidation = (s) => {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', async (req, res) => {
    let routines = await RoutineModel.find();
    if(!routines){
        res.send('No result');
    }
    res.json(routines);
})

app.get('/api/routine', async (req, res) => {
    let routines = await RoutineModel.find();
    res.json(routines);
})

app.post('/api/routine', async (req, res) => {
    let newRoutine = new RoutineModel(req.body)
    try {
        await newRoutine.save()
        res.json(newRoutine)
    } catch(err){
        res.json({err: err})
    }
})

// Get all available brewing tools
app.get('/api/tool', async (req, res) => {
    let tools = await ToolModel.find();
    res.json(tools);
})

// Add new brewing tool
app.post('/api/tool', async (req, res) => {
    let data = req.body
    if(data.productLink){
        if(!urlValidation(data.productLink)){
            return  res.json({err:"URL provided not valid"})
        }
    }
    let newTool = new ToolModel(data);
    await newTool.save();
    res.json(newTool);
})

app.get('/api/coffee', async (req, res) => {
    let coffees = await CoffeeModel.find();
    res.json(coffees);
});

app.post('/api/coffee', async (req, res) => {
    let data = req.body;
    let newCoffee = new CoffeeModel(data);

    await newCoffee.save();
    res.json(newCoffee);
});

app.listen(3000, () => {
    console.log(`App is listening on 3000`);
})
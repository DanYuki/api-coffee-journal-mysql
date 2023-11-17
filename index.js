const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const { RoutineModel } = require('./models/Routine');

main();

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch(err) {
        console.error("Error has occurred : " + err);
    }
}

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', async (req, res) => {
    let routines = await RoutineModel.find();
    if(!routines){
        res.send('No result');
    }
    res.json(routines);
    // res.send('This is index page, will display all routine')
})

app.post('/api/routine', async (req, res) => {
    let newRoutine = new RoutineModel(req.body)
    try {
        await newRoutine.save()
        res.json(newRoutine)
    } catch(err){
        res.json({err: err})
    }
    // res.json(req.body);
})

app.listen(3000, () => {
    console.log(`App is listening on 3000`);
})
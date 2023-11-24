const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const URL = require('url').URL;
const moment = require('moment');

const db = require('./config/database');

const urlValidation = (s) => {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};

app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    db.query('SELECT * FROM routine ORDER BY routine_id desc', (err, rows) => {
        if(err){
            return res.status(500).json({
                status:false,
                message:'Internal server error'
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Routines list',
                data: rows
            })
        }
    })
})

// app.get('/api/routine', async (req, res) => {
//     let routines = await RoutineModel.find();
//     res.json(routines);
// })

// app.post('/api/routine', async (req, res) => {
//     let newRoutine = new RoutineModel(req.body)
//     try {
//         await newRoutine.save()
//         res.json(newRoutine)
//     } catch(err){
//         res.json({err: err})
//     }
// })

// // Get all available brewing tools
// app.get('/api/tool', async (req, res) => {
//     let tools = await ToolModel.find();
//     res.json(tools);
// })

// // Add new brewing tool
// app.post('/api/tool', async (req, res) => {
//     let data = req.body
//     if(data.productLink){
//         if(!urlValidation(data.productLink)){
//             return  res.json({err:"URL provided not valid"})
//         }
//     }
//     let newTool = new ToolModel(data);
//     await newTool.save();
//     res.json(newTool);
// })

app.get('/api/coffee', (req, res) => {
    db.query('SELECT * FROM coffee ORDER BY coffee_id desc', (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'err'
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Coffee list',
                data: rows
            })
        }
    })
});

app.post('/api/coffee', (req, res) => {
    let formData = {
        coffee_name: req.body.coffee_name,
        bought_date: moment(req.body.bought_date).format('YYYY-MM-DD'),
        roast_type: req.body.roast_type,
        tasteProfile: req.body.tasteProfile,
        price: req.body.price,
        product_link: req.body.product_link ? req.body.product_link : '',
        weight: req.body.weight
    }

    // Change the tasteProfile from json into normal text instead. Make it more like description I guess
    db.query(`INSERT INTO coffee(coffee_name, bought_date, roast_type, tasteProfile, price, product_link, weight) VALUES ('${formData.coffee_name}', '${formData.bought_date}', '${formData.roast_type}', '${formData.tasteProfile}', ${formData.price}, '${formData.product_link}', ${formData.weight})`, (err, rows) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: err,
                data: JSON.stringify(req.body.tasteProfile)
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Insert data succesful',
                data: req.body
            })
        }
    })
});

app.listen(3000, () => {
    console.log(`App is listening on 3000`);
})
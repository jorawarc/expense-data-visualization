const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const MP = require('./models/Member');
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "localhost"
app.use(cors());
app.use(express.json());


// connect mongoDB
mongoose.connect(
    `mongodb://${MONGO_URI}:27017/data`,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log("Connected to mongodb")})
    .catch((e) => {console.log(`Could not connect to mongodb: ${e}`)});


app.post('/fetch', async (req, res) => {
    console.log(req.body);
    try{
        const mp = await MP.find(req.body.filter, {...req.body.expense, "member_id": 0});
        res.json(mp);
    } catch (e) {
        console.log(e);
        res.status(400).json({"error": e.message, "payload": {... req.body}});
    }
})


app.get('/avg-group', async (req, res) => {
    try{
        const caucus = await MP.aggregate([
            {
                $group: {
                    _id: '$caucus',
                    avg_travel: {$avg: "$total_travel"},
                    avg_contracts: {$avg: "$total_contracts"},
                    avg_hospitality: {$avg: "$total_hospitality"},
                }
            }
        ]);
        res.json(caucus);
    } catch (e) {
        console.log(e);
        res.status(400).json({"error": e.message, "payload": {... req.body}});
    }
})


app.get('/sum-group', async (req, res) => {
    try{
        const caucus = await MP.aggregate([
            {
                $group: {
                    _id: '$caucus',
                    total_travel: {$sum: "$total_travel"},
                    total_contracts: {$sum: "$total_contracts"},
                    total_hospitality: {$sum: "$total_hospitality"}
                }
            }
        ]);
        res.json(caucus);
    } catch (e) {
        console.log(e);
        res.status(400).json({"error": e.message, "payload": {... req.body}});
    }
})



app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});
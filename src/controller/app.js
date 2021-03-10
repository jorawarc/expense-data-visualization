const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const MP = require('./models/Member');
const app = express();

const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());


// connect mongoDB
mongoose.connect(
    `mongodb://${process.env.MONGO_URI}:27017/data`,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log("Connected to mongodb")})
    .catch((e) => {console.log(`Could not connect to mongodb: ${e}`)});


app.post('/fetch', async (req, res) => {
    console.log(req.body);
    try{
        const mp = await MP.find(req.body.filter, {...req.body.expense, "member_id": 0});
        const aggregation = await MP.aggregate([
            {
                $group: {
                    _id: '$caucus',
                    totalSalary: {$sum: '$salaries'}
                }
            }
        ])
        res.json(mp);
    } catch (e) {
        console.log(e);
        res.status(400).json({"error": e.message, "payload": {... req.body}});
    }
})


app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});
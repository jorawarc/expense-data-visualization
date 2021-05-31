const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const MP = require('./models/Member');
const async = require('async');
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "localhost"
app.use(cors());
app.use(express.json());


// connect mongoDB
mongoose.connect(
    `mongodb://${MONGO_URI}:27017/data`,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connected to mongodb")
    })
    .catch((e) => {
        console.log(`Could not connect to mongodb: ${e}`)
    });


app.post('/fetch', async (req, res) => {
    console.log(req.body);
    try {
        const mp = await MP.findOne({_id: req.body.value});
        res.json(mp);
    } catch (e) {
        console.log(e);
        res.status(400).json({"error": e.message, "payload": req.body});
    }
})

app.get('/top-spenders', async (req, res) => {
    try {
        let spenders = [];
        const uniqueCaucus = await MP.distinct("caucus");
        for (const caucus of uniqueCaucus) {
            let spender = await MP.aggregate([
                {"$match": {"caucus": caucus}},
                {
                    "$project": {
                        'name': '$name',
                        'constituency': '$constituency',
                        'total_expense' : {'$round': [{'$add': ['$total_hospitality', '$total_contracts', '$total_travel', '$salaries']}, 2]}
                    }
                }
            ]).sort({'total_expense': -1}).limit(3)
            spenders.push({spenders: spender, caucus: caucus})
        }
        res.json(spenders);

    } catch (e) {
        res.status(400).json({"error": e.message, "payload": req.body})
    }
})


app.get('/avg-group', async (req, res) => {
    try {
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
        res.status(400).json({"error": e.message, "payload": req.body});
    }
})


app.get('/sum-group', async (req, res) => {
    try {
        const caucus = await MP.aggregate([
            {
                $group: {
                    _id: '$caucus',
                    total_travel: {$sum: "$total_travel"},
                    total_contracts: {$sum: "$total_contracts"},
                    total_hospitality: {$sum: "$total_hospitality"},
                    total_salaries: {$sum: "$salaries"}
                }
            }
        ]);
        res.json(caucus);
    } catch (e) {
        console.log(e);
        res.status(400).json({"error": e.message, "payload": {...req.body}});
    }
})


app.get('/fetch-transactions', async (req, res) => {
    Promise.all([
        MP.aggregate([{$unwind: '$travel'}, {$match: {"travel.Total": {$gt: 0}}}, {$project: {_id: 0, total: "$travel.Total", date: "$travel.Travel start date"}}, {$group: {_id: "$date", total: {$avg: "$total"}}}]),
        MP.aggregate([{$unwind: '$hospitality'}, {$match: {"hospitality.Total": {$gt: 0}}}, {$project: {_id: 0, total: "$hospitality.Total", date: "$hospitality.Date"}}, {$group: {_id: "$date", total: {$avg: "$total"}}}]),
        MP.aggregate([{$unwind: '$contract'}, {$match: {"contract.Total": {$gt: 0}}}, {$project: {_id: 0, total: "$contract.Total", date: "$contract.Date"}}, {$group: {_id: "$date", total: {$avg: "$total"}}}])
    ]).then(([travel, hospitality, contract]) => {
        res.json({travel: travel, hospitality: hospitality, contract: contract})
    }).catch((e) => {
        console.log(e)
        res.status(400).json({"error": e.message, "payload": req.body})
    })
})

app.get('/sum-total', async (req, res) => {
    try{
        const total = await MP.aggregate([{
            $group: {
                _id: null,
                "total": {$sum: {$add: ["$total_travel", "$total_contracts", "$total_hospitality", "$salaries"]}}
            }},
            {
                $project: {
                    _id: 0,
                }
            }]
    )

        res.json(total[0]["total"]);
    } catch (e) {
        console.log(e)
        res.status(400).json({"error": e.message, "payload": req.body})
    }

})


app.get('/members', async (req, res) => {
    try{
        const members = await MP.find({}, {"name": "$name", "value": "$_id", "constituency": "$constituency", _id:0})
        res.json(members)
    } catch (e) {
        console.log(e)
        res.status(400).json({"error": e.message, "payload": req.body})
    }

})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
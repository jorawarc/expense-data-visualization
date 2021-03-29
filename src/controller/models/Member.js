
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MPSchema = new Schema({
    name: {type: String},
    memberID: {type: String, unique: true},
    salaries: {type: Number},
    constituency: String,
    total_travel: {type: Number},
    total_hospitality: {type: Number},
    total_contracts: {type: Number},
    caucus: {type: String},
    travel: {type: Array},
    hospitality: {type: Array},
    contract: {type: Array},
}, {collection: 'MP'})


const MP = mongoose.model('mps', MPSchema);
module.exports = MP;
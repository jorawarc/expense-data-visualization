
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MPSchema = new Schema({
    name: {type: String},
    memberID: {type: String, unique: true},
    salaries: {type: Number},
    constituency: String,
    caucus: String,
    travel: Array,
    hospitality: Array,
    contract: Array,
}, {collection: 'MP'})


const MP = mongoose.model('mps', MPSchema);
module.exports = MP;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Clicksum = new Schema({
    productName: {
        type: String
    },
    sourceName: {
        type: String
    },
    totalClicks: {
        type: Number
    },
    dateIngested: {
        type: Date
    }
});

module.exports = mongoose.model('Clicksum', Clicksum);
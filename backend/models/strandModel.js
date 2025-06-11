const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const strandSchema = new Schema ({
    patronName: { type: String, required: true},
    stageName: String,
    site: String,
    upload: String, //url or file name - ICEBOX
    notes: String,
    revenue: Number
}, {
    timestamps: true
});

module.exports = strandSchema
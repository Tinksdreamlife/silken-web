const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const strandSchema = new Schema ({
    patronName: { type: String, required: true},
    stageName: String,
    site: String,
    notes: String,
    revenue: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Strand', strandSchema);
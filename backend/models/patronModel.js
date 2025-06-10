const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const strandSchema = new Schema({
    site: { type: String, required: true },
    link: { type: String, required: true },
    notes: String,
});

const patronSchema = new Schema({
    patronName: { type: String, required: true },
    generalNotes: String,
    strands: [strandSchema], //embedded array of strands (with site, link, notes)
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Patron', patronSchema);
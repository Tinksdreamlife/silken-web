const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const patronSchema = new Schema({
    patronName: { type: String, required: true },
    generalNotes: String,
    strands: [{ type: Schema.ObjectId, ref: 'Strand'}], //embedded array of strands (with site, link, notes)
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Patron', patronSchema);
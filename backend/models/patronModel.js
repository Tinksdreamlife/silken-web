const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const patronSchema = new Schema({
    patronName: { type: String, required: true },
    generalNotes: String,
    strands: [{ type: Schema.ObjectId, ref: 'Strand' }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Patron', patronSchema);
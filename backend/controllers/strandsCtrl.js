const Strand = require('../models/strandModel');
const Patron = require('../models/patronModel');

module.exports = {
    create,
    deleteStrand
};

// POST aka Add a new Strand to a Patron
async function create(req, res) {
    try {
        const patron = await Patron.findById(req.params.patronId);
        if (!patron) return res.status(404).json({ error: 'Patron not found' });

        const strand = await Strand.create({
            patronName: patron.patronName,
            stageName: req.body.stageName,
            site: req.body.site,
            notes: req.body.notes,
            revenue: req.body.revenue
        });

        patron.strands.push(strand._id);
        await patron.save();

        const populatedPatron = await Patron.findById(patron._id).populate('strands');
        res.status(201).json(populatedPatron);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// DELETE - remove a strand from a Patron and delete the strand document
async function deleteStrand(req, res) {
    try {
        const patron = await Patron.findById(req.params.id);
        if (!patron) return res.status(404).json({ error: 'Patron not found' });

        // Remove the strand ObjectId reference from the patron.strands array
        patron.strands.pull(req.params.strandId);
        await patron.save();

        // Remove the Strand document
        await Strand.findByIdAndDelete(req.params.strandId);

        const populatedPatron = await Patron.findById(patron._id).populate('strands');
        res.json(populatedPatron);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
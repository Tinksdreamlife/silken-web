const Strand = require('../models/strandModel');
const Patron = require('../models/patronModel');

module.exports = {
    create,
    deleteStrand,
    show,
    update
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
        // Looking for the strand first to get the patron's name or id
        const strand = await Strand.findById(req.params.strandId);
        if (!strand) return res.status(404).json({ error: 'Strand not found' });

        // Finding the patron who has the strand in the strand array
        const patron = await Patron.findOne({ strands: req.params.strandId });
        if (!patron) return res.status(404).json({ error: 'Patron not found' });

        // Remove the strand Id reference from the patron's strands array
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

// GET single strand
async function show(req, res) {
    try {
        const strand = await Strand.findById(req.params.strandId);
        if (!strand) return res.status(404).json({ error: 'Strand not found' });
        res.json(strand);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// PUT update
async function update(req, res) {
    try {
        const strand = await Strand.findByIdAndUpdate(
            req.params.strandId,
            req.body,
            { new: true }
        );
        if (!strand) return res.status(404).json({ error: "Strand not found" });
        res.json(strand);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
const Patron = require('../models/patronModel');

module.exports = {
    create,
    delete: deleteStrand
};

async function create(req, res) {
    try {
        const patron = await Patron.findById(req.params.id);
        patron.strands.push(req.body);
        await patron.save();
        res.status(201).json(patron);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function deleteStrand(req, res) {
    try {
        const Patron = await Patron.findById(req.params.id );
        patron.strands.id(req.params.strandId).remove();
        await patron.save();
        res.json(patron);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
}
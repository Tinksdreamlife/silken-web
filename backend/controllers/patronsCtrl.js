const Patron = require('../models/patronModel');
const Strand = require('../models/strandModel');

module.exports = {
    index,
    show,
    create,
    update,
    delete: deleteOne,
};

async function index(req, res) {
    try {
        const patrons = await Patron.find({ user: req.user._id }).populate('strands');
        console.log("Fetched patrons for user:", req.user._id, patrons); //To Debug only
        res.json(patrons);
    } catch (err) {
        console.error("Error fetching patrons:", err); //Error log
        res.status(500).json({ error: err.message });
    }
}

async function show(req, res) {
    try {
        const patron = await Patron.findById(req.params.id).populate('strands');
        res.json(patron);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function create(req, res) {
    try {
        const patron = await Patron.create({
            ...req.body,
            user: req.user._id //connects the patron to the logged in user
        });

        res.status(201).json(patron);
    } catch (err) {
        console.error("Error creating patron:", err);
        res.status(400).json({ error: err.message });
    }
}

async function update(req, res) {
    const updatedPatron = await Patron.findByIdAndUpdate(
        req.params.id,
        req.body,
    );
    res.json(updatedPatron);
}

async function deleteOne(req, res) {
    await Patron.findByIdAndDelete(req.params.id);
    res.json({ message: 'Patron Deleted' });
}



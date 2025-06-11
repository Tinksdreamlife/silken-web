const Patron = require('../models/patronModel');

module.exports = {
    index,
    show,
    create,
    update,
    delete: deleteOne,
};

async function index(req, res) {
    try{
    const patrons = await Patron.find({}).populate('strands');
    res.json(patrons);
} catch (err) {
    res.status(500).json({ error: err.message});
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
    const patron = await Patron.create(req.body);
    res.status(201).json(patron);
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



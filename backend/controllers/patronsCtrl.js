const Patron = require('../models/patronModel');

module.exports = {
    index, 
    show, 
    create, 
    update, 
    delete: deleteOne,
};

async function index (req, res) {
    const patrons = await Patron.find({});
    res.json(patrons);
}

async function show(req, res) {
    const patron = await Patron.findById(req.params.id);
    res.json(patron);
}

async function create(req, res) {
    const patron = await Patron.create(req.body);
    res.status(201).json(patron);
}

async function update(req, res) {
    const patron = await Patron.findByIdAndUpdate(
        req.params.id,
        req.body,
    );
    res.json(updatedPatron);

    async function deleteOne(req, res) {
        await Patron.findByIdAndDelete(req.params.id);
        res.json({ message: 'Patron Deleted'});
    }
}
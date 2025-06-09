const { create } = require('domain');
const Profile = require('../models/profileModel');
const User = require('../models/user');

module.exports = {
    create,
    show,
    update,
};

// POST /api/profile
async function create(req, res) {
    try {
        const user = await User.findbyId(req.user._id);

        const profile = await Profile.create({
            user: user._id,
            name: user.name,
            email: user.email,
            stageNames: req.body.stageNames, //to look for an array
            sites: req.body.sites, // to look for an array
        });

        res.status(201).json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// PUT /api/profile
async function update(req, res) {
    try {
        const profile = await Profile.findOne({ user: req.user._id });

        if (!profile) return res.status(404).json({ error: 'Profile not found' });

        if (req.body.stageNames) profile.stageNames = req.body.stageNames;
        if (req.body.sites) profile.sites = req.body.sites;

        await profile.save();
        res.json(profile);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
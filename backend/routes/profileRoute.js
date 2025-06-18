const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controllers/profilesCtrl');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// CREATE profile
router.post('/', ensureLoggedIn, profilesCtrl.create);

// Pull current user's profile
router.get('/me', ensureLoggedIn, profilesCtrl.show);

// Update profile
router.put('/', ensureLoggedIn, profilesCtrl.update);

module.exports = router;
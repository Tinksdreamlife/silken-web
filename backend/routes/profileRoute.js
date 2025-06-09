const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controllers/profilesCtrl');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// CREATE profile
router.post('/', ensureLoggedIn, profilesCtrl.create);

// Pull current user's profile
router.get('/me', ensureLoggedIn, profilesCtrl.show); 
// '/me' is  a common convention to represent 
// currently authenticated user's profile

// Update profile
router.put('/', ensureLoggedIn, profilesCtrl.update);

module.exports = router;
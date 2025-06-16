const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const patronsCtrl = require('../controllers/patronsCtrl');

// GET /api/patrons (all patrons)
router.get('/', ensureLoggedIn, patronsCtrl.index);

// GET /api/patrons/:id (get a single patron by their ID)
router.get('/:id', ensureLoggedIn, patronsCtrl.show);

// POST /api/patrons (CREATE a new patron)
router.post('/', ensureLoggedIn, patronsCtrl.create);

// PUT /api/patrons/:id (UPDATE an existing patron)
router.put('/:id', ensureLoggedIn, patronsCtrl.update);

// DELETE /api/patrons/:id (DELETE a patron)
router.delete('/:id', ensureLoggedIn, patronsCtrl.delete)

module.exports = router;
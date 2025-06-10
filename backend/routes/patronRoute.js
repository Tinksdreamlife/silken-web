const express = require('express');
const router = express.Router();
const patronsCtrl = require('../controllers/patronsCtrl');

// GET /api/patrons (all patrons)
router.get('/', patronsCtrl.index);

// GET /api/patrons/:id (get a single patron by their ID)
router.get('/:id', patronsCtrl.show);

// POST /api/patrons (CREATE a new patron)
router.post('/', patronsCtrl.create);

// PUT /api/patrons/:id (UPDATE an existing patron)
router.put('/', patronsCtrl.update);

// DELETE /api/patrons/:id (DELETE a patron)
router.delete('/:id', patronsCtrl.delete)

module.exports = router;
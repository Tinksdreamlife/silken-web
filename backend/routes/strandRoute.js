const express = require('express');
const router = express.Router();
const strandsCtrl = require('../controllers/strandsCtrl');

// POST /api/strands/:patronId
router.post('/:patronId', strandsCtrl.create);

// DELETE /api/patrons/:id/:strandid to delete the strand NOT patron
router.delete('/:strandId', strandsCtrl.deleteStrand);

// GET one strand
router.get('/:strandId', strandsCtrl.show);

// PUT update strand
router.put('/:strandId', strandsCtrl.update);


module.exports = router;
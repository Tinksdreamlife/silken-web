const express = require('express');
const router = express.Router({mergeParams: true});
const strandsCtrl = require('../controllers/strandsCtrl');

// POST /api/patrons/:id/strands
router.post('/', strandsCtrl.create);

// DELETE /api/patrons/:id/:strandid to delete the strand NOT patron
router.delete('/:strandId', strandsCtrl.delete);

// POST /api/patrons/:id/strands - adding new strand to a specific patron
router.post('/patrons/:id/strands', strandsCtrl.create);

module.exports = router;
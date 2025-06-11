const express = require('express');
const router = express.Router({mergeParams: true});
const strandsCtrl = require('../controllers/strandsCtrl');

// POST /api/patrons/:id/strands
router.post('/', strandsCtrl.create);

// DELETE /api/patrons/:id/:strandid to delete the strand NOT patron
router.delete('/:strandId', strandsCtrl.deleteStrand);


module.exports = router;
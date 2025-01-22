const express = require('express');
const router = express.Router();
const LocationController = require('./controllers/LocationController');

router.get('/locations', LocationController.getAll);
router.post('/locations', LocationController.create);
router.put('/locations/:id', LocationController.update);
router.delete('/locations/:id', LocationController.delete);

module.exports = router;
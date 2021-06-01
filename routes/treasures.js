const router = require("express").Router()
const { body,} = require('express-validator');
const controller = require('../controllers/TreasureController ')
const auth = require('../middlewares/auth')

router.post('/find/treasure-boxes', [
    body('latitude', 'Latitude is required').isFloat(),
    body('longitude', 'Longitude is require').isFloat(),
    body('distance', 'Distance is required').isInt(),
    body('price_value', 'Price Value should be an array').optional().isArray()
],auth, controller.treasure_boxes);

module.exports = router;
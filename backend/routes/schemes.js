const express = require('express');
const router = express.Router();
const schemeController = require('../controllers/schemeController');

router.get('/', schemeController.getSchemes);
router.get('/latest', schemeController.getLatestSchemes);

module.exports = router;

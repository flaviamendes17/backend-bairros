const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');


router.get('/bairros/pdf', reportController.exportBairrosPdf);

module.exports = router;
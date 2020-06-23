const express = require('express');
const router = express.Router();
const mainController = require('./controllers/mainController');

router.get('/', mainController.indeX);
router.post('/result', mainController.result);

module.exports = router;
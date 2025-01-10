const express = require('express');
const router = express.Router();
const { scrapeCNN } = require('../Controllers/scrapeNews');

router.get('/', scrapeCNN);

module.exports = router;
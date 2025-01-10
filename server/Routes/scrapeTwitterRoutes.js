const express = require('express');
const router = express.Router();
const { scrapeTwitter } = require('../Controllers/scrapeTwitter');

router.get('/', scrapeTwitter);

module.exports = router;
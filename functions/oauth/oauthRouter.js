const express = require('express');
const controller = require('./oauthController');

const router = express.Router({ mergeParams: true });

router.get('/', controller);

module.exports = router;

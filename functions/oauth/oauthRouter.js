const express = require('express');
const oauthController = require('./oauthController');

const router = express.Router({ mergeParams: true });

router.get('/', oauthController);

module.exports = router;

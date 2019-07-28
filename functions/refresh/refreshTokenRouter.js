const express = require('express');
const controller = require('./refreshTokenController');

const router = express.Router({ mergeParams: true });

router.post('/', controller);

module.exports = router;

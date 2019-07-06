const express = require('express');
const controller = require('./healthController');

const router = express.Router({ mergeParams: true });

router.get('/', controller);

module.exports = router;

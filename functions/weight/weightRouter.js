const express = require('express');
const controller = require('./weightController');

const router = express.Router({ mergeParams: true });

router.get('/', controller);

module.exports = router;

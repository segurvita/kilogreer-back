const express = require('express');
const controller = require('./codeController');

const router = express.Router({ mergeParams: true });

router.get('/', controller);

module.exports = router;

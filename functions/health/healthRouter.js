const express = require('express');
const healthController = require('./healthController');

const router = express.Router({ mergeParams: true });

router.get('/', healthController);

module.exports = router;

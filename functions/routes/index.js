const express = require('express');
const functions = require('firebase-functions');
const router = express.Router();

/**
 * For Health Check
 */
router.get('/', (req, res, next) => {
  console.info('client_id: ', functions.config().withings.client_id);
  console.info('client_secret: ', functions.config().withings.client_secret);
  console.info('redirect_uri: ', functions.config().withings.redirect_uri);
  res.json({
    message: 'Hello World!',
    method: req.method,
  });
});

router.post('/', (req, res, next) => {
  res.json({
    message: 'POST is sended.',
    code: req.query.code || ''
  });
});

module.exports = router;

var express = require('express');
const functions = require('firebase-functions');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    message: 'GET is sended.',
    code: req.query.code || '',
  });
});

router.post('/', (req, res, next) => {
  res.json({
    message: 'POST is sended.',
    code: req.query.code || ''
  });
});

module.exports = router;

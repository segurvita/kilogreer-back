var express = require('express');
const functions = require('firebase-functions');
var router = express.Router();

router.get('/', (req, res, next) => {
  const message = 'GET is sended.';
  res.json({message});
});

router.post('/', (req, res, next) => {
  const message = 'POST is sended.';
  if(req.query.code){
    res.json({message, code: req.query.code});
  }else{
    res.json({message});
  }
});

module.exports = router;

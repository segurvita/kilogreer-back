const functions = require('firebase-functions');

module.exports = (req, res, next) => {
  res.json({
    message: 'Hello World!',
    method: req.method,
  });
};

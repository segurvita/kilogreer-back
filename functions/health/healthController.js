const functions = require('firebase-functions');

module.exports = (req, res, next) => {
  console.info('client_id: ', functions.config().withings.client_id);
  console.info('client_secret: ', functions.config().withings.client_secret);
  console.info('redirect_uri: ', functions.config().withings.redirect_uri);
  res.json({
    message: 'Hello World!',
    method: req.method,
  });
};

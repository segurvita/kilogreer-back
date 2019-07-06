const functions = require('firebase-functions');

module.exports = (req, res, next) => {
  console.info('Start.');

  // parameter varidation
  if (!req.query.code
      || !req.query.state
  ) {
    res.status(400).json({
      message: 'Error! query not found.',
      method: req.method,
      code: req.query.code || '',
      state: req.query.state || '',
    });
  }

  // config varidation
  if (!functions.config().withings.client_id
      || !functions.config().withings.client_secret
      || !functions.config().withings.redirect_uri
  ) {
    res.status(500).json({
      message: 'Error! config not found.',
      method: req.method,
      code: req.query.code || '',
      state: req.query.state || '',
    });
  }

  res.status(200).json({
    message: 'Success!',
    method: req.method,
    code: req.query.code || '',
    state: req.query.state || '',
  });
};

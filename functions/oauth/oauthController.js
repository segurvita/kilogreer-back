const functions = require('firebase-functions');

module.exports = (req, res, next) => {
  console.info('Start.');

  // parameter validation
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

  // config validation
  if (!functions.config().withings.client_id
      || !functions.config().withings.client_secret
      || !functions.config().withings.redirect_uri
      || !functions.config().withings.state
  ) {
    res.status(500).json({
      message: 'Error! config not found.',
      method: req.method,
      code: req.query.code || '',
      state: req.query.state || '',
    });
  }

  // state validation
  if (req.query.state !== functions.config().withings.state) {
    res.status(400).json({
      message: 'Error! state does not match.',
      method: req.method,
      code: req.query.code || '',
      state: req.query.state || '',
    });
  }

  // response
  res.status(200).json({
    message: 'Success!',
    method: req.method,
    code: req.query.code || '',
  });
};

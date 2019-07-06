const functions = require('firebase-functions');
const urljoin = require('url-join');

module.exports = (req, res, next) => {
  // config varidation
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

  // urljoin
  const fullUrl = urljoin(
    'https://account.withings.com',
    'oauth2_user/authorize2',
    '?response_type=code',
    '?scope=user.metrics',
    `?client_id=${functions.config().withings.client_id}`,
    `?state=${functions.config().withings.state}`,
    `?redirect_uri=${functions.config().withings.redirect_uri}`,
  );

  // response
  res.redirect(fullUrl);
};

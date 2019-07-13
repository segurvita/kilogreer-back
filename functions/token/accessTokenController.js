const axios = require('axios');
const functions = require('firebase-functions');
const querystring = require('querystring');

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

  // parameter validation
  if (!req.query.code) {
    res.status(400).json({
      message: 'Error! query not found.',
      method: req.method,
      code: req.query.code || '',
    });
  }

  axios.post(
    'https://account.withings.com/oauth2/token',
    querystring.stringify({
      grant_type: 'authorization_code',
      client_id: functions.config().withings.client_id,
      client_secret: functions.config().withings.client_secret,
      code: req.query.code,
      redirect_uri: functions.config().withings.redirect_uri,
    }),
  ).then((response) => {
    console.info('response: ', response.data);

    return res.status(200).json(response.data);
  }).catch((error) => {
    if (error.response) {
      console.error('data: ', error.response.data);
      console.error('status: ', error.response.status);
      console.error('headers: ', error.response.headers);
    } else if (error.request) {
      console.error('request: ', error.request);
    } else {
      console.error('message: ', error.message);
    }
    console.error('config: ', error.config);

    return res.status(400).json({
      message: 'Error!',
      method: req.method,
    });
  });
};

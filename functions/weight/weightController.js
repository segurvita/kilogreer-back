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
  const accessToken = req.header('Authorization');
  if (!accessToken) {
    res.status(401).json({
      message: 'Error! Authorization is not found.',
      method: req.method,
    });
  }

  // timestamp
  const now = Math.floor((new Date()).getTime());

  axios.get(
    'https://account.withings.com/measure',
    {
      params: {
        action: 'getmeas',
        meastype: 1,
        category: 1,
        startdate: 0,
        enddate: now,
      },
      header: {
        Authorization: accessToken,
      },
    },
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

const axios = require('axios');
const functions = require('firebase-functions');
const querystring = require('querystring');

module.exports = (req, res, next) => {
  // parameter validation
  if (!req.query.code) {
    const error = new Error(JSON.stringify({
      location: 'query',
      param: 'code',
      value: '',
      msg: 'Error! query not found.'
    }));
    error.status = 400;
    next(error);
    return;
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
  }).catch((err) => {
    if (err.response) {
      console.error('data: ', err.response.data);
      console.error('status: ', err.response.status);
      console.error('headers: ', err.response.headers);
    } else if (err.request) {
      console.error('request: ', err.request);
    } else {
      console.error('message: ', err.message);
    }
    console.error('config: ', err.config);

    const error = new Error(JSON.stringify({
      location: '',
      param: '',
      value: '',
      msg: 'Error!'
    }));
    error.status = 400;
    next(error);
    return;
  });
};

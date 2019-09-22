const axios = require('axios');
const functions = require('firebase-functions');

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
    const error = new Error(JSON.stringify({
      location: 'header',
      param: 'Authorization',
      value: '',
      msg: 'Error! Authorization is not found.'
    }));
    error.status = 401;
    next(error);
    return;
  }

  // timestamp
  const now = new Date();
  const enddate = Math.floor(now.getTime() / 1000);
  //const startdate = enddate - 60*60*24*7;
  startdate = 1558796400; // 2019/05/26
  console.info('startdate: ', startdate);
  console.info('enddate: ', enddate);

  axios.get(
    'https://wbsapi.withings.net/measure',
    {
      params: {
        action: 'getmeas',
        meastype: 1,
        category: 1,
        startdate,
        enddate,
      },
      headers: {
        Authorization: accessToken,
      },
    },
  ).then((response) => {
    console.info('response.data: ', response.data);
    console.info('response.status: ', response.status);

    let statusCode;
    switch (response.data.status) {
      case 0:
        statusCode = 200;
        break;
      case 100:
      case 101:
      case 102:
      case 200:
      case 401:
        statusCode = 401;
        break;
      default:
        statusCode = 400;
    }
    return res.status(statusCode).json(response.data);
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

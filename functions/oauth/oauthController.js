const functions = require('firebase-functions');

module.exports = (req, res, next) => {
  console.info('Start.');

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

  // parameter validation
  if (!req.query.state) {
    const error = new Error(JSON.stringify({
      location: 'query',
      param: 'state',
      value: '',
      msg: 'Error! query not found.'
    }));
    error.status = 400;
    next(error);
    return;
  }

  // state validation
  if (req.query.state !== functions.config().withings.state) {
    const error = new Error(JSON.stringify({
      location: 'query',
      param: 'state',
      value: '',
      msg: 'Error! state does not match.'
    }));
    error.status = 400;
    next(error);
    return;
  }

  // response
  res.status(200).json({
    message: 'Success!',
    method: req.method,
    code: req.query.code || '',
  });
};

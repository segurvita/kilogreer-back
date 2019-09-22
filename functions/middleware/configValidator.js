const functions = require('firebase-functions');

/**
 * バリデーション実行
 * @param {object} req リクエストオブジェクト
 * @param {object} res レスポンスオブジェクト
 * @param {object} next ネクストオブジェクト
 */
module.exports = (req, res, next) => {
  // config varidation
  if (!functions.config().withings.client_id
    || !functions.config().withings.client_secret
    || !functions.config().withings.redirect_uri
    || !functions.config().withings.state
  ) {
    const error = new Error(JSON.stringify({
      location: 'code',
      param: 'config',
      value: '',
      msg: 'Error! config not found.'
    }));
    error.status = 400;
    next(error);
    return;
  }

  // 出力
  console.info('client_id: ', functions.config().withings.client_id);
  console.info('client_secret: ', functions.config().withings.client_secret);
  console.info('redirect_uri: ', functions.config().withings.redirect_uri);
  console.info('state: ', functions.config().withings.state);

  next();
};

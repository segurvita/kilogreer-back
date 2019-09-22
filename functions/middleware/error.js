/* 
 * 定数定義 
 */
const error500Message = 'Internal Server Error';

/* 
 * Errors配列の１つの要素を作る 
 */
const createErrorItem = (inItem) => {
  const outItem = {};
  // 要素がなければ作る 
  outItem.location = inItem.location || 'code';
  outItem.param = inItem.param || '';
  outItem.value = inItem.value || '';
  outItem.msg = inItem.msg || inItem.message || error500Message;
  return outItem;
};

/** 
 * express-validatorのメッセージオブジェクトからボディを構築する 
 * @param {object} objMessage express-validatorのメッセージオブジェクト 
 */
const createBodyFromExpressValidator = objMessage => ({
  errors: objMessage.errors.map(inItem => createErrorItem(inItem)),
});

/** 
 * オブジェクトからボディを構築する 
 * @param {object} objMessage オブジェクト 
 */
const createBodyFromObject = objMessage => ({
  errors: [createErrorItem(objMessage)],
});

/** 
 * 文字列からボディを構築する 
 * @param {string} strMessage 文字列メッセージ 
 */
const createBodyFromString = strMessage => ({
  errors: [{
    location: 'code',
    param: '',
    value: '',
    msg: strMessage,
  }],
});

/**
 * エラーレスポンスを構築するミドルウェア
 * @param {object} err エラーオブジェクト
 * @param {object} req リクエストオブジェクト
 * @param {object} res レスポンスオブジェクト
 * @param {object} next ネクストオブジェクト
 */
const errorHandler = (err, req, res, next) => {

  // ステータスがなければデフォルト値を入れる 
  res.status(err.status || 500);

  // メッセージがなければデフォルト値を入れる 
  const strMessage = err.message || error500Message;

  try {
    // JSON文字列を解析する 
    const objMessage = JSON.parse(strMessage);

    if (objMessage.errors) {
      // errorsがあればexpress-validatorとみなす 
      res.body = createBodyFromExpressValidator(objMessage);
    } else if (Object.prototype.toString.call(objMessage) === '[object Object]') {
      // オブジェクトの場合 
      res.body = createBodyFromObject(objMessage);
    }
  } catch (e) {
    // JSON文字列の解析に失敗した場合、 
    // ただの文字列のメッセージとみなす 
    res.body = createBodyFromString(strMessage);
  }

  // レスポンス送信 
  res.json(res.body);
};

module.exports = errorHandler;

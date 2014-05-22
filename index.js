var request = require('request')
  , validUrl = require('valid-url')
  , userAgent = 'html-validator v0.0.7'
  ;

function mkReqOpts(opts){
  var newOpts = {
    uri: 'http://validator.w3.org/nu/',
    headers: {
      'User-Agent' : userAgent
    },
    qs: {out:opts.format},
    method: 'GET'
  };

  if(opts.url){
    newOpts.qs.doc = opts.url;
  }

  if(opts.data){
    newOpts.body = opts.data;
    newOpts.method = 'POST';
    newOpts.headers = {
      'Content-Type': 'text/html; charset=utf-8',
      'User-Agent' : userAgent
    };
  }

  return newOpts;
}

module.exports = function validator(opts, callback){

  if(!opts.format){
    return callback(new Error('Missing required param: format'), null)
  }

  if(!opts.url && !opts.data){
    return callback(new Error('Missing required params: url or data'), null)
  }

  if(opts.url && !validUrl.isWebUri(opts.url)){
    return callback(new Error('Invalid url'), null);
  }

  var reqOpts = mkReqOpts(opts);

  request(reqOpts, function(error, response, result){

    if(error){
      return callback(error, null);
    }

    var data = opts.format == 'json' ? JSON.parse(result) : result;

    return callback(null, data);

  });
};
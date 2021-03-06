'use strict';

var assert = require('assert')
  , validator = require('./../index')
  ;

describe('Validator - inputs', function(){

  it('Should throw if opts.url or opts.data is not specified', function(done){

    var opts = {format:'json'};

    validator(opts, function(err, data){
      assert.throws(function(){
          if(err) throw err;
        }, function(err){
          if((err instanceof Error) && /Missing required params: url or data/.test(err)){
            return true
          }
        },
        "Unexpected error"
      );
      done();
    });

  });

  it('Should throw if opts.url contains invalid url', function(done){

    var opts = {url:'pysje'};

    validator(opts, function(err, data){
      assert.throws(function(){
          if(err) throw err;
        }, function(err){
          if((err instanceof Error) && /Invalid url/.test(err)){
            return true
          }
        },
        "Unexpected error"
      );
      done();
    });

  });

});
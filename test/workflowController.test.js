'use strict';

var chai = require('chai');
var should = chai.should();
var assert = chai.assert;
var chaiHttp = require('chai-http')
var app =require('../app');

chai.use(chaiHttp);

let mochaAsync = (fn) => {
  return (done) => {
    fn.call().then(done, (err)=>{done(err)});
  };
};


describe('workflowController', function() {
  // Maybe need initialize something before listening,
  // for example, initialize db as follows:
  /*before('initialize db', function(done){
    db.initialize().then(function(){
      done()
    })  
  })*/

  describe('/', function() {
    it('POST', function (done) {
      var data = {
        user: {userId:'', account: '123456', trueName: '测试用户'},
        when: new Date().getTime(),
        formData: {},
        step: {
          stepCode: 'step1',
          stepName: '申请人',
        }
      };

      chai.request(app)
        .post('/')
        .send({'event': 'STEP_RENDERING',
              'data': JSON.stringify(data)
            })
        .end((err, res) => {
          console.debug(res.body);
          res.should.have.status(200);
          res.should.be.json;
          assert.isNotNull(res.body.cancel);
          assert.equal(res.body.cancel, false);
          
          done();
        })
    });

    // Async test
    /*
    it('operate', mochaAsync(async()=>{
      // do something
    }));
    */
  })
});
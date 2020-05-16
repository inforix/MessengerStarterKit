'using strict';

const logger = require('../services/log');
const {InfoPlusEvent, InfoPlusResponse, InfoPlusRequest, InfoPlusUser} = require('../models/InfoPlus');

module.exports.workflow = async function(req, res){

  let r; // InfoPlusResponse

  try{
    // 记录请求的内容
    logger.debug(req.body);

    if(!req.body.event){
      res.status(500).json({Cancel: true, Prompt: 'Invalid Event'}).end();
      return;
    }

    var event = req.body.event; // 事件
    var data = JSON.parse(req.body.data);
    var ipreq = InfoPlusRequest.fromJSON(data);

    logger.debug('Event: ', event);
    logger.debug('Data: ', data);
    logger.debug('Request: %j', ipreq);

    if (event === InfoPlusEvent.INSTANCE_STARTING){
      /**
       * 这里撰写业务逻辑
       */
      r = new InfoPlusResponse();
      r.cancel = false;
      r.prompt = 'You have no privilege';
    } else if (event === InfoPlusEvent.STEP_RENDERING && ipreq.step.stepCode === 'step1'){
      r = new InfoPlusResponse();
      r.cancel = false;
      r.formData.fieldt1 = 'TEST T1';
    } else {
      r = new InfoPlusResponse();
      r.cancel = false;
    }

    logger.debug('Response: ', r);
    res.json(r);
  }catch(err){
    logger.debug('Error occurred: ', err);
    r = new InfoPlusResponse;
    r.cancel = true;
    r.prompt = err.message;
    r.detail = err.stack;
    logger.debug('Response: ', r);
    res.json(r);
  }
}
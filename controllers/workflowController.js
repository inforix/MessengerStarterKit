'using strict';

const logger = require('../services/log');
const {InfoPlusEvent, InfoPlusResponse, InfoPlusRequest, InfoPlusUser} = require('../models/InfoPlus');

module.exports.workflow = async function(req, res){

  let r; // InfoPlusResponse

  try{
    // 记录请求的内容
    logger.debug(req.body);

    var event = req.body.event; // 事件
    var data = JSON.parse(req.body.data);
    var ipreq = InfoPlusRequest.fromJSON(data);

    if (event === InfoPlusEvent.INSTANCE_STARTING){
      /**
       * 这里撰写业务逻辑
       */

      r = new InfoPlusResponse();
      r.Cancel = true;
    }

    logger.debug('Response: ', r);
    res.json(r);
  }catch(err){
    logger.debug('Error occurred: ', err);
    r = new InfoPlusResponse;
    r.Cancel = true;
    r.Prompt = err.message;
    r.Detail = err.stack;
    logger.debug('Response: ', r);
    res.json(r);
  }
}
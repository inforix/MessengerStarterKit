'use strict';

/**
 * 事件类型
 */
module.exports.InfoPlusEvent = class {
  static get INSTANCE_STARTING() { return 'INSTANCE_STARTING'; }
  static get INSTANCE_STARTED() { return 'INSTANCE_STARTED'; }
  static get INSTANCE_COMPLETING() { return 'INSTANCE_COMPLETING'; }
  static get INSTANCE_COMPLETED() { return 'INSTANCE_COMPLETED'; } 
  static get ACTION_DOING() { return 'ACTION_DOING'; }
  static get ACTION_DONE() { return 'ACTION_DONE'; }
  static get ACTION_SAVING() { return 'ACTION_SAVING'; }          
  static get ACTION_SAVED() { return 'ACTION_SAVED'; }
  static get STEP_EXPIRING() { return 'STEP_EXPIRING'; }
  static get STEP_EXPIRED() { return 'STEP_EXPIRED'; }
  static get FIELD_CHANGING() { return 'FIELD_CHANGING'; }
  static get ECHO() { return 'ECHO'; } 
  static get STUB_12() { return 'STUB_12'; }
  static get FIELD_SUGGESTING() { return 'FIELD_SUGGESTING'; }
  static get STEP_RENDERING() { return 'STEP_RENDERING'; }      
  static get STEP_RENDERED() { return 'STEP_RENDERED'; }
  static get ACTION_CLICKING() { return 'ACTION_CLICKING'; }  
  static get STEP_PRINTING() { return 'STEP_PRINTING'; }   
  static get INSTANCE_EXPIRING() { return 'INSTANCE_EXPIRING'; }
  static get INSTANCE_EXPIRED() { return 'INSTANCE_EXPIRED'; }
  static get INSTANCE_KILLING() { return 'INSTANCE_KILLING'; }
  static get INSTANCE_KILLED() { return 'INSTANCE_KILLED'; }
  static get INSTANCE_COMPENSATION() { return 'INSTANCE_COMPENSATION'; }
}

module.exports.InfoPlusResponse = class {

  /**
   * Type: Boolean
   * Cancel the current doing if Cancel == True
   */
  Cancel;

  /**
   * Type: String
   * When you cancel the event, give the user a prompt
   */
  Prompt;

  /**
   * Type: Long
   * for Expiration: 
   * 0: do nothing
   * -1: kill
   * positive: seconds to extend
   */
  Then;

  /**
   * Type: Long
   * Then, after expiration, submit an action
   */
  TheAction;

  /**
   * Type: String
   * Detail will contain exception information
   */
  Detail;

  /**
   * Type: Dictionary
   * Response form data, when
   *   WorkflowStarting as Initialization data
   *   FieldChanging as auto fills
   */
  FormData;

  /**
   * Type: List
   * Codes.Maybe a list of CodeList, which used when:
   * 1.ON_FIELD_SUGGESTING return only one CodeList suggested,
   * 2.ON_STEP_RENDERING/ED, return CodeLists should be initialized.
   * 3.ON_FIELD_CHANGING, as above.
   */
  Codes;
}

/**
 * 字段
 */
class InfoPlusField {
  /**
   * Type: String
   * 字段名称, 譬如：fieldDocumentType
   */
  name;

  /**
   * Type: String
   * 类型
   */
  type;

  /**
   * Type: Integrate
   * 重复深度
   */
  repeatDepth;

  /**
   * Type:  Boolean
   */
  notNull;

  /**
   * Type: Boolean
   */
  allowExternalCode;

  /**
   * Type: Boolean
   */
  fieldChanging;
}

module.exports.InfoPlusField = InfoPlusField;


class InfoPlusUser {
  /**
   * Type: GUID String
   * 用户ID，GUID类型
   */
  userId;

  /**
   * Type: String
   * 学工号
   */
  account;

  /**
   * Type: String
   * 用户姓名
   */
  trueName;
}

module.exports.InfoPlusUser = InfoPlusUser;

module.exports.InfoPlusRequest = class{
  /**
   * Type: String
   * 版本号, 如 20120630
   */
  version;
  /**
   * Info Plus User
   */
  user;

  /**
   * Unix timestamp
   */
  when;

  /**
   * Form Data
   */
  formData;

  /**
   * fields
   */
  fields;

  /**
   * Step
   */
  step;

  /**
   * actionCode，'action1'
   */
  actionCode;

  /**
   * action name, 譬如 "完成"
   */
  actionName;

  /**
   * 下一步
   */
  nextSteps;

  /**
   * Type: Boolean
   * 释放版本
   */
  release;

  static fromJSON(json){
    return Object.assign(new InfoPlusRequest(), json);
  }
}
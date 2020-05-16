'use strict';

module.exports = {
  name: 'StartKit',
  version: '1.0.0',

  port: 3000,

  logDir: process.env.LOGDIR || './logs/', // 必须以/结尾
}
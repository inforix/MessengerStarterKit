var log4js = require('log4js')

log4js.configure({
  appenders: {
    access: {
      category: 'access',
      type: 'dateFile',
      filename: './log/access.log',
      pattern: '-yyyy-MM-dd',
      backups: 3
    },
    system: {
      category: 'system',
      type: 'dateFile',
      filename: './log/system.log',
      pattern: '-yyyy-MM-dd',
      backups: 3
    },
    error: {
      category: 'error',
      type: 'dateFile',
      filename: './log/error.log',
      pattern: '-yyyy-MM-dd',
      backups: 3
    },
    console: {
      type: 'console'
    }
  },
  categories: {
    access: { appenders: ['access'], level: log4js.levels.ALL },
    default: { appenders: ['access', 'console'], level: log4js.levels.ALL },
    system: { appenders: ['system', 'console'], level: log4js.levels.ALL },
    error: { appenders: ['error'], level: log4js.levels.ERROR }
  }
})

module.exports = {
  default: log4js.getLogger('default'),
  access: log4js.getLogger('access'),
  system: log4js.getLogger('system'),
  error: log4js.getLogger('error'),
  express: log4js.connectLogger(log4js.getLogger('access'), { level: log4js.levels.INFO }),
  isDebug: function (category) {
    return (log4js.levels.DEBUG.level >= category.level.level)
  },

  debug: function(message, ...args){this.system.debug(message, args);},

  express: function(){log4js.connectLogger(this.access, {level: 'info'});}
}

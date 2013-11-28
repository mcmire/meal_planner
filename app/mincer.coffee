mincer = require('mincer')
config = require('./config')
bower = require('./bower')

env = new mincer.Environment

env.appendPath('app/assets/javascripts')
env.appendPath('app/assets/stylesheets')
bower(env)

mincer.logger.use(console)

module.exports = (app) ->
  app.use(config.assetsPath, mincer.createServer(env))

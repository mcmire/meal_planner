path = require('path')

config = {}

config.app = do (config: {}) ->
  config.rootDir = path.resolve(__dirname, '..')
  config.host = '127.0.0.1'
  config.port = process.env['PORT'] or '3000'
  config.templatesDir = path.resolve(__dirname, './templates')
  config.publicDir = path.resolve(__dirname, './public')
  config.staticPath = 'static'
  config.assetsPath = '/assets'
  config

config.mongoose = do (config: {}) ->
  config.host = process.env['MONGODB_HOST'] or 'localhost'
  config.databaseName = 'meal_planner'
  config.connectionString = "mongodb://#{config.host}/#{config.database}"
  config

module.exports = config

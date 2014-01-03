var config = require('../config')
var express = require('express')
var logger = require('./logger')
var mincer = require('./mincer')
var routes = require('./routes')
// Simply requiring this will set it up
require('./bookshelf')

module.exports = function () {
  var app = express()

  app.set('view engine', 'jade')
  app.set('views', config.app.templatesDir)
  app.locals({config: config.app})
  app.use(logger)

  app.use('/assets', mincer)
  app.use(express['static'](config.app.staticPath))
  routes(app)

  if (app.get('env') === 'development') {
    app.use(express.errorHandler())
  }

  app.listen(config.app.port, config.app.host, function (error) {
    if (error) {
      console.error("!! Express failed to start: " + error)
      process.exit(1)
    } else {
      console.log("== Express is listening on " + config.app.host + " port " + config.app.port)
    }
  })
}

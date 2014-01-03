var Fiber = require('fibers')

module.exports = function () {
  Fiber(function () {
    var express = require('express')
    var config = require('../config')
    var logger = require('./logger')
    var mincer = require('./mincer')
    var routes = require('./routes')
    var app = express()

    // configuration
    app.set('view engine', 'jade')
    app.set('views', config.app.templatesDir)
    app.locals({config: config.app})

    // middleware
    app.use(logger)
    app.use(express.bodyParser())
    app.use(express.cookieParser('replace me with a random key'))
    app.use(express.session({ cookie: { maxAge: 60000 }}))
    app.use('/assets', mincer)
    app.use(express['static'](config.app.staticPath))

    // routing
    routes(app)
    if (app.get('env') === 'development') {
      app.use(express.errorHandler())
    }
    app.use(function (req, res, next) {
      res.render('not_found')
    })

    // go go gadget
    app.listen(config.app.port, config.app.host, function (error) {
      if (error) {
        console.error("!! Express failed to start: " + error)
        process.exit(1)
      } else {
        console.log("== Express is listening on " + config.app.host + " port " + config.app.port)
      }
    })
  }).run()
}

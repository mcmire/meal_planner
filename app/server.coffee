#!/usr/bin/env coffee

config = require('./config')
express = require('express')
logger = require('./logger')
mincer = require('./mincer')
routes = require('./routes')
# Simply requiring this will set it up
mongoose = require('./mongoose')

app = express()
app.set('view engine', 'jade')
app.set('views', config.app.templatesDir)
app.locals(config: config.app)
logger(app)

# OTHER STUFF
#app.use(express.favicon())
#app.use(express.json())
#app.use(express.urlencoded())
#app.use(express.methodOverride())

mincer(app)
app.use(express.static(config.app.staticPath))
routes(app)

if app.get('env') is 'development'
  app.use(express.errorHandler())

app.listen config.app.port, config.app.host, (error) ->
  if error
    console.error("!! Express failed to start: #{error}")
    process.exit(1)
  else
    console.log("== Express is listening on #{config.app.host} port #{config.app.port}")

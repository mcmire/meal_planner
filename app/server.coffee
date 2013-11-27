#!/usr/bin/env coffee

config = require('./config')
express = require('express')

app = express()
app.set('view engine', 'jade')
app.set('views', config.templatesDir)
app.locals(config: config)
app.use(express.logger(format: 'at=:date method=:method url=:url'))

# OTHER STUFF
#app.use(express.favicon())
#app.use(express.json())
#app.use(express.urlencoded())
#app.use(express.methodOverride())

require('./routes')(app)

app.use(require('stylus').middleware(config.publicDir))
app.use(express.static(config.staticDir))

if app.get('env') is 'development'
  app.use(express.errorHandler())

app.listen config.port, config.host, (error) ->
  if error
    console.error("!! Express failed to start: #{error}")
    process.exit(1)
  else
    console.log("== Express is listening on #{config.host} port #{config.port}")

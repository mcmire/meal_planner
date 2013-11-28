#!/usr/bin/env coffee

config = require('./config')
express = require('express')

app = express()
app.set('view engine', 'jade')
app.set('views', config.templatesDir)
app.locals(config: config)
express.logger.token 'time', (req, res) ->
  (new Date()).toISOString()
app.use(express.logger(format: 'at=:time method=:method url=:url status=:status'))

# OTHER STUFF
#app.use(express.favicon())
#app.use(express.json())
#app.use(express.urlencoded())
#app.use(express.methodOverride())

require('./mincer')(app)

require('./routes')(app)

app.use(express.static(config.staticPath))

if app.get('env') is 'development'
  app.use(express.errorHandler())

app.listen config.port, config.host, (error) ->
  if error
    console.error("!! Express failed to start: #{error}")
    process.exit(1)
  else
    console.log("== Express is listening on #{config.host} port #{config.port}")

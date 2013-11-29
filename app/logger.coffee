express = require('express')

express.logger.token 'time', (req, res) -> (new Date()).toISOString()

module.exports = (app) ->
  app.use(express.logger(format: 'at=:time method=:method url=:url status=:status'))

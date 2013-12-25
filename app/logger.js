var express = require('express')

express.logger.token('time', function (req, res) {
  return (new Date()).toISOString()
})

module.exports = function (app) {
  app.use(express.logger({format: 'at=:time method=:method url=:url status=:status'}))
}

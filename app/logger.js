var express = require('express')

express.logger.token('time', function () {
  return (new Date()).toISOString()
})

module.exports = express.logger({
  format: 'at=:time method=:method url=:url status=:status'
})

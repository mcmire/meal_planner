path = require('path')

config = {}

config.host = '127.0.0.1'
config.port = process.env['PORT'] or '3000'
config.templatesDir = path.resolve(__dirname, './templates')
config.publicDir = path.resolve(__dirname, './public')
config.staticDir = path.resolve(__dirname, './static')

module.exports = config

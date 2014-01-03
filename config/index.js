var path = require('path')
var argv = require('optimist').argv
var config = {}
var app = {}
var db = {}

app.rootDir = path.resolve(__dirname, '..')
app.appDir = path.join(app.rootDir, 'app')
app.templatesDir = path.join(app.appDir, 'templates')
app.publicDir = path.join(app.rootDir, 'public')
app.staticPath = 'static'
app.assetsPath = '/assets'
app.host = '127.0.0.1'
app.port = (argv.port || argv.p || '3000')

db.host = '127.0.0.1'
db.databaseName = 'meal_planner'

module.exports = {
  app: app,
  db: db
}

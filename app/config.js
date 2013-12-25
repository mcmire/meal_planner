var path = require('path')
var argv = require('optimist').argv
var config = {}
var app = {}
var mongoose = {}

app.rootDir = path.resolve(__dirname, '..')
app.appDir = path.join(app.rootDir, 'app')
app.templatesDir = path.join(app.appDir, 'templates')
app.publicDir = path.join(app.rootDir, 'public')
app.staticPath = 'static'
app.assetsPath = '/assets'
app.host = '127.0.0.1'
app.port = (argv.port || argv.p || '3000')

mongoose.host = (process.env['MONGODB_HOST'] || 'localhost')
mongoose.databaseName = 'meal_planner'
mongoose.connectionString = ("mongodb://" + mongoose.host + "/" + mongoose.databaseName)

module.exports = {
  app: app,
  mongoose: mongoose
}

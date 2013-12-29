var _ = require('lodash')
var fs = require('fs')
var Mincer = require('mincer')
var path = require('path')
var config = require('./config')

module.exports = function (app) {
  Mincer.logger.use(console)

  var paths = ['app/assets/javascripts', 'app/assets/stylesheets']
  entries = fs.readdirSync(path.join(config.app.rootDir, 'bower_components'))
  _.each(entries, function (entry) {
    var subdir = path.join('bower_components', entry)
    paths.push(subdir)
    // bootstrap
    paths.push(path.join(subdir, 'js'))
    paths.push(path.join(subdir, 'stylus'))
    paths.push(path.join(subdir, 'fonts'))
  })

  var env = new Mincer.Environment()
  _.each(paths, function (path) {
    env.appendPath(path)
  })
  app.use('/assets', Mincer.createServer(env))
}

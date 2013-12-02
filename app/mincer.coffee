mincer = require('mincer')
config = require('./config')
fs = require('fs')
path = require('path')

module.exports = (app) ->
  mincer.logger.use(console)

  paths = ['app/assets/javascripts', 'app/assets/stylesheets']
  entries = fs.readdirSync path.join(config.rootDir, 'bower_components')
  entries.forEach (entry) ->
    subdir = path.join('bower_components', entry)
    paths.push(subdir)
    # bootstrap
    paths.push(path.join(subdir, 'js'))
    paths.push(path.join(subdir, 'stylus'))
    paths.push(path.join(subdir, 'fonts'))

  app.use require('connect-assets')(
    paths: paths
    servePath: config.app.assetsPath
  )

var mincer = require('mincer')
var config = require('./config')
var fs = require('fs')
var path = require('path')

module.exports = function (app) {
  mincer.logger.use(console)

  var paths = ['app/assets/javascripts', 'app/assets/stylesheets']
  entries = fs.readdirSync(path.join(config.app.rootDir, 'bower_components'))
  entries.forEach(function (entry) {
    var subdir = path.join('bower_components', entry)
    paths.push(subdir)
    // bootstrap
    paths.push(path.join(subdir, 'js'))
    paths.push(path.join(subdir, 'stylus'))
    paths.push(path.join(subdir, 'fonts'))
  })

  console.log('Compiling assets...')
  var connectAssets = require('connect-assets')({
    paths: paths,
    servePath: config.app.assetsPath
  })
  console.log('Done!')

  app.use(connectAssets);
}

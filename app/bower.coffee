fs = require('fs')
path = require('path')
config = require('./config')

module.exports = (env) ->
  entries = fs.readdirSync path.join(config.rootDir, 'bower_components')
  entries.forEach (entry) ->
    subdir = path.join('bower_components', entry)
    env.appendPath(subdir)
    env.appendPath(path.join(subdir, 'js'))
    env.appendPath(path.join(subdir, 'stylus'))
    env.appendPath(path.join(subdir, 'fonts'))

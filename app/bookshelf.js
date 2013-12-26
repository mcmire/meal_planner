var Bookshelf = require('bookshelf')
var config = require('./config').db

var bookshelf = Bookshelf.initialize({
  client: 'postgresql',
  connection: {
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.databaseName,
    charset: 'utf8'
  }
})

bookshelf.createModel = function (modelName, options) {
  var subclass = this.Model.extend(options)
  subclass.modelName = modelName
  return subclass
}

module.exports = bookshelf

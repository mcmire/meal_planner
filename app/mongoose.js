var config = require('./config')
var mongoose = require('mongoose')

mongoose.connect(config.mongoose.connectionString)

module.exports = mongoose

config = require('./config')
mongoose = require('mongoose')

mongoose.connect(config.mongoose.connectionString)

module.exports = mongoose

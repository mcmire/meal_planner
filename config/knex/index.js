var database = require('../index').database

module.exports = {
  client: 'postgresql',
  connection: {
    host: database.host,
    user: database.username,
    password: database.password,
    database: database.name,
    charset: 'utf8'
  }
}

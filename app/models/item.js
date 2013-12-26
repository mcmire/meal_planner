var bookshelf = require('../bookshelf')

var Item = bookshelf.createModel('Item', {
  tableName: 'items'
})

module.exports = Item

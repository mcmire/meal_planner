var Item = require('./models/item')
var FormInputBuilder = require('./helpers/form_input_builder')

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index')
  })

  app.get('/items/new', function (req, res) {
    item = new Item()
    input = new FormInputBuilder(item)
    res.render('items/new', {
      input: input
    })
  })
}

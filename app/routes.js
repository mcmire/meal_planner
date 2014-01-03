var notifications = require('./notifications')
var FormInputBuilder = require('./helpers/form_input_builder')
var ItemForm = require('./forms/item_form')

module.exports = function (app) {
  function renderItemForm(form, res) {
    var input = new FormInputBuilder(form)
    res.render('items/new', {
      input: input
    })
  }

  app.all('*', notifications)

  app.get('/', function (req, res) {
    res.render('index')
  })

  app.get('/items', function (req, res) {
    res.render('items/index')
  })

  app.get('/items/new', function (req, res) {
    var form = new ItemForm({
      name: 'this is a test',
      serving_size: 10,
      calories: 20,
      protein: 30,
      total_fat: 40,
      total_carbohydrates: 50
    })
    renderItemForm(form, res)
  })

  app.post('/items', function (req, res, done) {
    // TODO: improve this, can we get 'item' from ItemForm.model?
    var form = new ItemForm(req.body.item)
    if (form.isValid()) {
      form.save()
        .then(function () {
          req.flash('success', 'Created item: ' + form.get('name'))
          console.log('Flash is:', req.flash())
          res.redirect('/items')
          done()
        })
        ['catch'](done)
    } else {
      renderItemForm(form, res)
    }
  })
}

Item = require('./models/item')

module.exports = (app) ->
  app.get '/', (req, res) ->
    Item.find (err, items) ->
      throw err if err
      res.render 'index', items: items

  app.get '/items/:id', (req, res) ->
    Item.findById req.params['id'], (err, item) ->
      throw err if err
      res.render 'item', item: item

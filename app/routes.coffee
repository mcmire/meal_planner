Item = require('./models/item')

module.exports = (app) ->
  routeToRoot = (path) ->
    app.get path, (req, res) ->
      res.render 'index'

  routeToRoot('/')

  app.get '/items.json', (req, res) ->
    Item.find (err, items) ->
      throw err if err
      doc = { items: items }
      res.send(200, doc)

  app.get '/items/:id.json', (req, res) ->
    Item.findById req.params.id, (err, item) ->
      throw err if err
      doc = { item: item }
      res.send(200, doc)

  ['/items/:id'].forEach(routeToRoot)

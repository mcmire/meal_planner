define 'router', ['index'], (app) ->
  Router = Backbone.Router.extend
    routes:
      '': 'index',
      'items/:id': 'itemDetail'

    index: ->
      app.load()

    itemDetail: (id) ->
      app.showItemDetail(id)

  new Router

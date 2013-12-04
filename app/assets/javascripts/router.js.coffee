Router = Backbone.Router.extend
  routes:
    '': 'index',
    'items/:id': 'itemDetail'

  index: ->
    MealPlanner.controller.loadIndex()

  itemDetail: (id) ->
    MealPlanner.controller.showItemDetail(id)

MealPlanner.router = new Router

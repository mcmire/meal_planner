MealPlanner.ItemCollection = Backbone.Collection.extend
  model: MealPlanner.Item,
  url: '/items.json'
  idAttribute: '_id'

  parse: (data) ->
    if data.items?
      data.items
    else
      data

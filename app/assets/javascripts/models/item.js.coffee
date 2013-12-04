MealPlanner.Item = Backbone.Model.extend
  url: -> "/items/#{@id}.json"
  idAttribute: '_id'

  parse: (data) ->
    if data.item?
      data.item
    else
      data

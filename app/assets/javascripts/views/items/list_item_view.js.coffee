MealPlanner.Items.ListItemView = Backbone.View.extend
  tag: 'li'
  className: 'item'
  attributes: ->
    'data-id': @model.id

  initialize: ->
    @$link = $('<a href="#">')

  render: ->
    @$link.html(@model.get('name'))
    @$el.html(@$link)

MealPlanner.Items.ShowView = Backbone.View.extend
  template: JST['templates/items/show']
  events:
    'click .js-switch-to-edit': 'switchToShow'

  initialize: (parent, options) ->
    @parent = parent

  render: ->
    content = @template(item: @model)
    @$el.html(content)

  switchToShow: ->
    @parent.switchToShow()

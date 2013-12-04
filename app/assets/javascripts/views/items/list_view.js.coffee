MealPlanner.Items.ListView = Backbone.View.extend
  tag: 'ul'
  className: 'items'
  events:
    "click .item a": 'showItemDetail'

  initialize: ->
    @subviews = @collection.map (model) ->
      new MealPlanner.Items.ListItemView(model: model)

  render: ->
    @$el.empty()
    for subview in @subviews
      subview.render()
      @$el.append(subview.$el)

  showItemDetail: (event) ->
    $link = $(event.target)
    itemId = $link.parent().data('id')
    MealPlanner.router.navigate "items/#{itemId}", trigger: true
    return false

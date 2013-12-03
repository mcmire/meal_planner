define 'views/items/list_item_view', ->
  Backbone.View.extend
    tag: 'li'
    className: 'item'
    attributes: ->
      'data-id': @model.id

    initialize: ->
      @$link = $('<a href="#">')

    render: ->
      @$link.html(@model.get('name'))
      @$el.html(@$link)


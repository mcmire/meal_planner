define 'views/items/detail_view', ->
  Backbone.View.extend
    template: JST['templates/items/detail']

    render: ->
      @$el.html(@template(item: @model))

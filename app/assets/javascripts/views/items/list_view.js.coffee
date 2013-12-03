define 'views/items/list_view',
  ['views/items/list_item_view'],
  (ListItemView) ->

    Backbone.View.extend
      tag: 'ul'
      className: 'items'
      events:
        "click .item a": 'showItemDetail'

      initialize: ->
        @subviews = @collection.map (model) ->
          new ListItemView(model: model)

      render: ->
        @$el.empty()
        for subview in @subviews
          subview.render()
          @$el.append(subview.$el)

      showItemDetail: (event) ->
        $link = $(event.target)
        itemId = $link.parent().data('id')
        require('router').navigate "items/#{itemId}", trigger: true
        return false

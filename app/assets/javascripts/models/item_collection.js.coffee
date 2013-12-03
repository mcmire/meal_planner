define 'models/item_collection', ['models/item'], (Item) ->
  Backbone.Collection.extend
    model: Item,
    url: '/items.json'
    idAttribute: '_id'

    parse: (data) ->
      if data.items?
        data.items
      else
        data

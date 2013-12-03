define 'index',
  ['models/item', 'models/item_collection', 'views/items/list_view', 'views/items/detail_view'],
  (Item, ItemCollection, ListView, DetailView) ->
    new class MealPlanner
      constructor: ->
        @$sidebar = $('.js-sidebar')
        @$content = $('.js-content')

      load: ->
        itemCollection = new ItemCollection
        itemCollection.fetch().then =>
          listView = new ListView(collection: itemCollection)
          listView.render()
          @$sidebar.append(listView.$el)

      showItemDetail: (id) ->
        item = new Item(_id: id)
        item.fetch().then =>
          detailView = new DetailView(model: item)
          detailView.render()
          @$content.html(detailView.$el)

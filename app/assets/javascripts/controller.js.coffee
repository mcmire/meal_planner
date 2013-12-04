class Controller
  constructor: ->
    @$sidebar = $('.js-sidebar')
    @$content = $('.js-content')

  loadIndex: ->
    itemCollection = new MealPlanner.ItemCollection
    itemCollection.fetch().then =>
      listView = new MealPlanner.Items.ListView(collection: itemCollection)
      listView.render()
      @$sidebar.append(listView.$el)

  showItemDetail: (id) ->
    item = new MealPlanner.Item(_id: id)
    item.fetch().then =>
      detailView = new MealPlanner.Items.DetailView(model: item)
      detailView.render()
      @$content.html(detailView.$el)

MealPlanner.controller = new Controller

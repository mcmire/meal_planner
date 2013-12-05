class Controller
  constructor: ->
    @$sidebar = $('.js-sidebar')
    @$content = $('.js-content')

  loadIndex: ->
    itemCollection = new MealPlanner.ItemCollection
    itemCollection.fetch().then =>
      view = new MealPlanner.Items.ListView(collection: itemCollection)
      view.render()
      @$sidebar.html(view.$el)

  showItemDetail: (id) ->
    item = new MealPlanner.Item(_id: id)
    item.fetch().then =>
      view = new MealPlanner.Items.ShowOrEditView(model: item)
      view.render()
      @$content.html(view.$el)

MealPlanner.controller = new Controller

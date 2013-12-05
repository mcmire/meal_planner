MealPlanner.Items.ShowOrEditView = Backbone.View.extend
  events:
    'click .js-switch-to-show': 'switchToEdit'

  initialize: ->
    @isEditing = false

  render: ->
    #@subview?.undelegateEvents()
    cons = @_determineSubViewConstructor()
    @subview = new cons(this, model: @model)
    @subview.render()
    @$el.html(@subview.$el)

  switchToShow: ->
    @isEditing = false
    @render()

  switchToEdit: ->
    @isEditing = true
    @render()

  _determineSubViewConstructor: ->
    if @isEditing
      MealPlanner.Items.EditView
    else
      MealPlanner.Items.ShowView

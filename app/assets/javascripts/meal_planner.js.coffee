###
{CachedModuleSet} = MealPlanner

views = new CachedModuleSet (properties) ->
  Backbone.View.extend(properties)
models = new CachedModuleSet (properties) ->
  Backbone.Model.extend(properties)
collections = new CachedModuleSet (properties) ->
  Backbone.Collection.extend(properties)
###

_.extend MealPlanner,
  ###
  view: (name, definition) ->
    if definition
      views.set(name, definition)
    else
      views.get(name)

  model: (name, definition) ->
    if definition
      models.set(name, definition)
    else
      models.get(name)

  collection: (name, definition) ->
    if definition
      collections.set(name, definition)
    else
      collections.get(name)

  ###
  start: ->
    path = window.location.pathname
    silent = (path and path isnt '/')

    Backbone.history.start(pushState: true, silent: silent)
    if silent
      @router.navigate('', replace: true, trigger: true)
      backbonePath = path.replace(/^\//, '')
      @router.navigate(backbonePath, trigger: true)

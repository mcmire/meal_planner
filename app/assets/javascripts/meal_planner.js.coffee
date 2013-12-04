_.extend MealPlanner,
  start: ->
    path = window.location.pathname
    silent = (path and path isnt '/')

    Backbone.history.start(pushState: true, silent: silent)
    if silent
      @router.navigate('', replace: true, trigger: true)
      backbonePath = path.replace(/^\//, '')
      @router.navigate(backbonePath, trigger: true)

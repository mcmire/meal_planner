_.extend(MealPlanner, {
  start: function () {
    path = window.location.pathname
    silent = (path && path !== '/')

    Backbone.history.start({pushState: true, silent: silent})
    if (silent) {
      this.router.navigate('', {replace: true, trigger: true})
      backbonePath = path.replace(/^\//, '')
      this.router.navigate(backbonePath, {trigger: true})
    }
  }
})

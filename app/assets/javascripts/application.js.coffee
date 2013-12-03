#= require jquery
#= require underscore
#= require backbone
#= require almond
#= require models
#= require views
#= require router
#= require index
#= require templates/items/detail

jQuery ->
  router = require('router')
  path = window.location.pathname
  silent = (path and path isnt '/')

  Backbone.history.start(pushState: true, silent: silent)
  if silent
    router.navigate('', replace: true, trigger: true)
    backbonePath = path.replace(/^\//, '')
    router.navigate(backbonePath, trigger: true)

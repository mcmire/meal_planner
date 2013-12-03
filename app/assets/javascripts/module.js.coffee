definedModules = {}
requiredModules = {}

window.define = (path, fn) ->
  definedModules[path] = fn

window.require = (path) ->
  if path in requiredModules
    requiredModules[path]
  else
    requiredModules[path] = definedModules[path]()

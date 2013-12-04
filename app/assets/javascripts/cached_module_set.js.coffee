class MealPlanner.CachedModuleSet
  constructor: (definer) ->
    @definer = definer
    @definedModules = {}
    @loadedModules = {}

  set: (name, definition) ->
    @definedModules[name] = definition

  get: (name) ->
    if name in @loadedModules
      @loadedModules[name]
    else
      @loadedModules[name] = @definer(@definedModules[name]())

Item = require('./app/models/item')
async = require('async')

module.exports = (grunt) ->
  grunt.registerTask 'db:clear', 'Clear the database', ->
    done = @async()
    Item.remove(done)

  grunt.registerTask 'db:seed', 'Seed the database', ->
    done = @async()

    items = [
      {
        name: 'Whole Foods Granola'
        calories_amount: 1000
        carbs_amount: 100
        fat_amount: 20
        protein_amount: 15
        serving_size: [10, 'g']
      },
      {
        name: 'Chiquita Banana'
        calories_amount: 500
        carbs_amount: 200
        fat_amount: 35
        protein_amount: 25
        serving_size: [4, 'tbsp']
      },
      {
        name: 'General Mills Cheerios'
        calories_amount: 800
        carbs_amount: 500
        fat_amount: 35
        protein_amount: 50
        serving_size: [50, 'g']
      }
    ]

    iterator = (itemData, callback) ->
      item = new Item()
      for attr, value of itemData
        item[attr] = value
      console.log "Saving item: #{JSON.stringify(item.toJSON())}"
      item.save(callback)
    async.each items, iterator, done

  grunt.registerTask 'db', ['db:clear', 'db:seed']

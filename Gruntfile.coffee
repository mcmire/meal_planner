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
        name: 'Whole Foods Granola (12oz)'
        carbs_amount: 100
        fat_amount: 20
        protein_amount: 15
      },
      {
        name: 'Chiquita Banana'
        carbs_amount: 200
        fat_amount: 35
        protein_amount: 25
      },
      {
        name: 'General Mills Cheerios'
        carbs_amount: 500
        fat_amount: 35
        protein_amount: 50
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

var childProcess = require('child_process')
var config = require('./config')
var Item = require('./app/models/item')
var async = require('async')

module.exports = function (grunt) {
  grunt.registerTask('db:create', 'Create the database', function () {
    var done = this.async()
    var databaseName = config.database.name
    childProcess.exec('createdb ' + databaseName, function (err, stdout, stderr) {
      if (err) {
        if (/already exists/.test(err.message)) {
          console.log("Database " + databaseName + " already exists.")
        } else {
          throw err
        }
      } else {
        console.log("Database " + databaseName + " created.")
      }
      done()
    })
  })

  grunt.registerTask('db:clear', 'Clear the database', function () {
    done = this.async()
    Item.remove(done)
  })

  grunt.registerTask('db:seed', 'Seed the database', function () {
    var done = this.async()
    var items = [
      {
        name: 'Whole Foods Granola',
        calories_amount: 1000,
        carbs_amount: 100,
        fat_amount: 20,
        protein_amount: 15,
        serving_size: [10, 'g']
      },
      {
        name: 'Chiquita Banana',
        calories_amount: 500,
        carbs_amount: 200,
        fat_amount: 35,
        protein_amount: 25,
        serving_size: [4, 'tbsp']
      },
      {
        name: 'General Mills Cheerios',
        calories_amount: 800,
        carbs_amount: 500,
        fat_amount: 35,
        protein_amount: 50,
        serving_size: [50, 'g']
      }
    ]
    var iterator = function (itemData, callback) {
      item = new Item()
      _.each(itemData, function (attr, value) {
        item[attr] = value
      })
      console.log("Saving item: #{JSON.stringify(item.toJSON())}")
      item.save(callback)
    }

    async.each(items, iterator, done)
  })

  grunt.registerTask('db', ['db:clear', 'db:seed'])
}

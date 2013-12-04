mongoose = require('../mongoose')

Item = new mongoose.Schema
  name: String
  calories_amount: Number
  carbs_amount: Number
  fat_amount: Number
  protein_amount: Number
  serving_size: Array

module.exports = mongoose.model('Item', Item)

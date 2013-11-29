mongoose = require('../mongoose')

Item = new mongoose.Schema(
  name: String
  carbs_amount: Number
  fat_amount: Number
  protein_amount: Number
)

module.exports = mongoose.model('Item', Item)

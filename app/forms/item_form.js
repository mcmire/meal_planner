var Item = require('../models/item')
var Form = require('./form')

function ItemForm(attributes) {
  Form.call(this, attributes)
}

ItemForm.allowedAttributes = [
  'name',
  'serving_size',
  'calories',
  'calories_from_fat',
  'protein',
  'total_fat',
  'saturated_fat',
  'trans_fat',
  'polyunsaturated_fat',
  'monounsaturated_fat',
  'cholesterol',
  'total_carbohydrates',
  'fiber',
  'soluble_fiber',
  'sugars',
  'other_carbohydrates',
  'vitamin_a',
  'thiamin',
  'riboflavin',
  'niacin',
  'vitamin_b6',
  'total_vitamin_b9',
  'vitamin_b12',
  'vitamin_c',
  'vitamin_d',
  'vitamin_e',
  'vitamin_k',
  'calcium',
  'copper',
  'iron',
  'magnesium',
  'magnanese',
  'phosphorus',
  'potassium',
  'sodium',
  'zinc'
]

ItemForm.model = Item

ItemForm.validations = {
  'presence': [
    'name',
    'serving_size',
    'calories',
    'protein',
    'total_fat',
    'total_carbohydrates'
  ]
}

module.exports = ItemForm

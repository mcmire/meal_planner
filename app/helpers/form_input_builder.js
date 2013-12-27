var _ = require('lodash')
var InputTagBuilder = require('./input_tag_builder')

function FormInputBuilder(model) {
  this.model = model

  this.labeledText = function (attrName, options) {
    options = _.extend({}, options, {labeled: true})
    var input = new InputTagBuilder(this, 'text', attrName, options)
    return input.toHTML()
  }

  this.labeledNumber = function (attrName, options) {
    options = _.extend({}, options, {labeled: true})
    var input = new InputTagBuilder(this, 'number', attrName, options)
    return input.toHTML()
  }
}

module.exports = FormInputBuilder

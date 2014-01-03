var _ = require('lodash')
var InputTagBuilder = require('./input_tag_builder')

function FormInputBuilder(form) {
  this.form = form
  this.record = form.record

  this.labeledText = function (attributeName, options) {
    options = _.extend({}, options, {labeled: true})
    var input = new InputTagBuilder(this, 'text', attributeName, options)
    return input.toHTML()
  }

  this.labeledNumber = function (attributeName, options) {
    options = _.extend({}, options, {labeled: true})
    var input = new InputTagBuilder(this, 'number', attributeName, options)
    return input.toHTML()
  }
}

module.exports = FormInputBuilder

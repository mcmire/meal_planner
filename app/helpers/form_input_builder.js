var LabeledTextInput = require('./labeled_text_input')

function FormInputBuilder(model) {
  this.model = model

  this.labeledText = function (attrName, options) {
    var input = new LabeledTextInput(this, attrName, options)
    return input.toHTML()
  }
}

module.exports = FormInputBuilder

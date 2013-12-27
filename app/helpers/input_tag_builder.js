var _ = require('lodash')
var escapeHTML = require('html-escape')
var string = require('string')

function InputTagBuilder(formBuilder, attrName, options) {
  var _this = this

  var buildTagAttribute = function (key, value, escape) {
    options = options || {}
    if (escape) {
      value = escapeHTML(value)
    }
    return key + '="' + value + '"'
  }

  var cleanAttributes = function (attributes) {
    return _.omit(attributes, function (value) {
      return value === null || value === undefined
    })
  }

  var buildTagAttributes = function (attributes, escape) {
    options = options || {}
    var cleanedAttributes = cleanAttributes(attributes)
    return _.map(cleanedAttributes, function (value, key) {
      return buildTagAttribute(key, value, escape)
    }).join(" ")
  }

  var buildStartTag = function (name, attributes, escape) {
    var inside = ""
    var attributeString = buildTagAttributes(attributes, escape)
    inside += name
    if (attributeString) {
      inside += " " + attributeString
    }
    return '<' + inside + '>'
  }

  var buildContentAndEndTag = function (name, content) {
    var string = ""
    if (content !== null) {
      string += content
      string += '</' + name + '>'
    }
    return string
  }

  var buildTag = function (name, options) {
    options = options || {}
    attributes = options.attributes || {}

    return buildStartTag(name, attributes, options.escape)
  }

  var buildContentTag = function (name, options) {
    options = options || {}
    attributes = options.attributes || {}

    if (options.content !== null) {
      if (_.isFunction(options.content)) {
        content = options.content()
      } else {
        content = options.content
      }
    }

    return (
      buildStartTag(name, attributes, options.escape) +
      buildContentAndEndTag(name, content)
    )
  }

  var fieldName = function () {
    return (
      string(_this.model.constructor.modelName.toLowerCase()).underscore().s +
      '[' + _this.attrName + ']'
    )
  }

  var fieldValue = function () {
    return _this.model.get(_this.attrName)
  }

  var labelTag = function () {
    var name = fieldName()
    var content =
      _this.options.label ||
      string(_this.attrName).humanize().s

    return buildContentTag('label', {
      attributes: { 'for': name },
      content: content
    })
  }

  var inputTag = function () {
    return buildTag('input', {
      attributes: {
        type: 'text',
        name: fieldName(),
        value: fieldValue(),
        'class': 'form-control'
      }
    })
  }

  var inputGroup = function (content) {
    return buildContentTag('div', {
      attributes: { 'class': 'input-group' },
      content: content
    })
  }

  var addon = function (content) {
    return buildContentTag('span', {
      attributes: { 'class': 'input-group-addon' },
      content: content
    })
  }

  var formGroup = function (content) {
    return buildContentTag('div', {
      attributes: { 'class': 'form-group input' },
      content: content
    })
  }

  this.model = formBuilder.model
  this.attrName = attrName
  this.options = options || {}

  this.toHTML = function () {
    var content
    if (this.options.addon) {
      content = inputGroup(inputTag() + addon(this.options.addon))
    } else {
      content = inputTag()
    }
    return formGroup(labelTag() + content)
  }
}

module.exports = InputTagBuilder

var _ = require('lodash')
var escapeHTML = require('html-escape')

function TagBuilder() {
  var _this = this

  var buildTagAttribute = function (key, value, escape) {
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

  var convertCssClasses = function (attributes) {
    attributes = _.clone(attributes)
    var classes = [attributes['class'], attributes['classes']]
    classes = _.flatten([classes]).join(" ").split(" ")
    var cssClass = _.uniq(classes).join(" ").trim()

    ;delete attributes['class']
    ;delete attributes['classes']

    if (cssClass) {
      attributes['class'] = cssClass
    }

    return attributes
  }

  var buildTagAttributes = function (attributes, escape) {
    var cleanedAttributes = cleanAttributes(convertCssClasses(attributes))
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

  this.tag = function (name, options) {
    options = options || {}
    attributes = options.attributes || {}

    return buildStartTag(name, attributes, options.escape)
  }

  this.contentTag = function (name, options) {
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
}

module.exports = TagBuilder

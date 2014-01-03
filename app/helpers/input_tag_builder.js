var _ = require('lodash')
var escapeHTML = require('html-escape')
var S = require('string')

function InputTagBuilder(formBuilder, type, attributeName, options) {
  var _this = this
  var formGroupOptions
  var errors

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
    options = options || {}
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
    var lowercasedModelName = _this.record.modelName.toLowerCase()
    var underscoredModelName = S(lowercasedModelName).underscore().s

    return underscoredModelName + '[' + _this.attributeName + ']'
  }

  var fieldValue = function () {
    return _this.record.get(_this.attributeName)
  }

  var labelTag = function () {
    var name = fieldName()
    var content =
      _this.options.label ||
      S(_this.attributeName).humanize().s

    return buildContentTag('label', {
      attributes: { 'for': name },
      content: content
    })
  }

  var buildClasses = function (options, extraClasses) {
    extraClasses = extraClasses || []
    var classes = _.clone(extraClasses)
    classes.push(options['class'])
    classes = classes.concat(options['classes'])
    if (_this.form.hasValidationOn('presence', _this.attributeName)) {
      classes.push('required')
    }
    return classes
  }

  var inputTag = function () {
    var classes = buildClasses(_this.options, ['form-control'])
    if (errors.length) {
      classes.push('error')
    }

    return buildTag('input', {
      attributes: {
        type: type,
        name: fieldName(),
        value: fieldValue(),
        classes: classes,
        tabindex: _this.options.tabindex
      }
    })
  }

  var inputGroup = function (content) {
    var classes = buildClasses(inputGroupOptions, ['input-group'])
    return buildContentTag('div', {
      attributes: {
        classes: classes
      },
      content: content
    })
  }

  var addon = function (content) {
    return buildContentTag('span', {
      attributes: { classes: ['input-group-addon'] },
      content: content
    })
  }

  var formGroup = function (content) {
    var classes = buildClasses(formGroupOptions, ['form-group', 'input'])
    return buildContentTag('div', {
      attributes: {
        'classes': classes
      },
      content: content
    })
  }

  var errorMessages = function (errors) {
    return buildContentTag('p', {
      attributes: {
        'classes': ['help-block', 'error']
      },
      content: errors.join('; ')
    })
  }

  this.form = formBuilder.form
  this.record = formBuilder.record
  this.attributeName = attributeName
  this.options = options || {}
  inputGroupOptions = options.inputGroup || {}
  formGroupOptions = options.formGroup || {}
  errors = this.form.errorsOn(this.attributeName)

  this.toHTML = function () {
    var parts = []

    if (this.options.addon) {
      parts.push(inputGroup(inputTag() + addon(this.options.addon)))
    } else {
      parts.push(inputTag())
    }

    if (this.options.labeled) {
      parts.unshift(labelTag())
    }

    if (errors.length) {
      parts.push(errorMessages(errors))
    }

    return formGroup(parts.join(""))
  }
}

module.exports = InputTagBuilder

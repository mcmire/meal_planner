var _ = require('lodash')
var S = require('string')
var TagBuilder = require('./tag_builder')

function InputTagBuilder(formBuilder, type, attributeName, options) {
  var _this = this
  var tagBuilder = new TagBuilder()

  var formGroupOptions
  var errors

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

    return tagBuilder.contentTag('label', {
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

    return tagBuilder.tag('input', {
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
    return tagBuilder.contentTag('div', {
      attributes: {
        classes: classes
      },
      content: content
    })
  }

  var addon = function (content) {
    return tagBuilder.contentTag('span', {
      attributes: { classes: ['input-group-addon'] },
      content: content
    })
  }

  var formGroup = function (content) {
    var classes = buildClasses(formGroupOptions, ['form-group', 'input'])
    return tagBuilder.contentTag('div', {
      attributes: {
        'classes': classes
      },
      content: content
    })
  }

  var errorMessages = function (errors) {
    return tagBuilder.contentTag('p', {
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

var _ = require('lodash')
var S = require('string')

var VALIDATORS = {
  'presence': function (value) {
    return !!value
  }
}
var ERRORS = {
  'presence': "can't be blank"
}

function Form(attributes) {
  var _this = this
  var validationsByAttributeName = {}
  var errorsByAttributeName = {}

  function getValidationsFor(attributeName) {
    if (!(attributeName in validationsByAttributeName)) {
      validationsByAttributeName[attributeName] = {}
    }

    return validationsByAttributeName[attributeName]
  }

  function getErrorsFor(attributeName) {
    if (!(attributeName in errorsByAttributeName)) {
      errorsByAttributeName[attributeName] = []
    }

    return errorsByAttributeName[attributeName]
  }

  function addMessageFor(attributeName, validationType) {
    var error = ERRORS[validationType]
    getErrorsFor(attributeName).push(error)
  }

  function buildValidationsByAttributeName(form) {
    var validationsByAttributeName = {}
    _.each(form.constructor.validations, function (attributeNames, validationType) {
      _.each(attributeNames, function (attributeName) {
        if (!(attributeName in validationsByAttributeName)) {
          validationsByAttributeName[attributeName] = {}
        }
        validationsByAttributeName[attributeName][validationType] = 1
      })
    })
    return validationsByAttributeName
  }

  this.attributes = attributes || {}
  this.errors = errorsByAttributeName
  validationsByAttributeName = buildValidationsByAttributeName(this)
  this.record = new this.constructor.model(_.pick(this.attributes, this.constructor.allowedAttributes))

  this.isValid = function () {
    var isValid = true

    _.each(validationsByAttributeName, function (validationTypes, attributeName) {
      _.each(validationTypes, function (_, validationType) {
        var validator = VALIDATORS[validationType]
        if (!validator(_this.attributes[attributeName])) {
          addMessageFor(attributeName, validationType)
          isValid = false
        }
      })
    })

    return isValid
  }

  this.save = function () {
    return this.record.save()
  }

  this.errorsOn = function (attributeName) {
    return errorsByAttributeName[attributeName] || []
  }

  this.hasValidationOn = function (validationType, attributeName) {
    var validations = validationsByAttributeName[attributeName] || {}
    return validations[validationType]
  }

  this.get = function (attributeName) {
    return this.record[attributeName]
  }
}

module.exports = Form

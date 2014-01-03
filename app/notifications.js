var _ = require('lodash')
var flash = require('../lib/flash')

function buildNotification(type, message) {
  return (
    '<div class="alert alert-dismissable alert-' + type + '">' +
      '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
      message +
    '</div>'
  )
}

function buildNotificationsContainer(messages) {
  var notifications = _.reduce(messages, function (string, message, type) {
    string += buildNotification(type, message)
    return string
  }, "")
  return '<div class="notifications">' + notifications + '</div>'
}

module.exports = function (req, res, next) {
  flash(req, res, function () {
    res.locals.notifications = function () {
      return buildNotificationsContainer(res.locals.flash())
    }
    next()
  })
}

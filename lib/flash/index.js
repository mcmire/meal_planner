var NextFlash = require('./next')

module.exports = function (req, res, next) {
  function interfaceTo(flash) {
    return function () {
      var key = arguments[0], value = arguments[1]
      if (key) {
        if (value) {
          flash.set(key, value)
        } else {
          return flash.get(key)
        }
      } else {
        return flash
      }
    }
  }

  console.log('Loading flash from session:', req.session.flash)

  var flash = req._flash = NextFlash.fromSession(req.session.flash || {})

  req.flash = interfaceTo(flash)
  req.flash.now = interfaceTo(flash.now)
  res.locals.flash = function () {
    return flash.forView()
  }

  console.log('Flash was:', flash.hash)
  next()
  console.log('Flash is now:', flash.hash)

  console.log('Writing flash to session:', flash.toSession())

  req.session.flash = flash.toSession()
}

var _ = require('lodash')
var NowFlash = require('./now')

function NextFlash(hash, keysToDiscard) {
  this.hash = hash || {}
  this.keysToDiscard = keysToDiscard || {}
  this.now = new NowFlash(this)
}

_.extend(NextFlash.prototype, {
  set: function (key, value) {
    delete this.keysToDiscard[key]
    this.hash[key] = value
  },

  get: function (key) {
    return this.hash[key]
  },

  discard: function (key) {
    this.keysToDiscard[key] = 1
  },

  sweep: function () {
    var _this = this

    _.each(this.keysToDiscard, function (_, key) {
      delete _this.hash[key]
    })

    this.keysToDiscard = _.reduce(_.keys(this.hash), function (hash, key) {
      hash[key] = 1
      return hash
    }, {})
  },

  toSession: function () {
    return {
      hash: _.clone(this.hash),
      keysToDiscard: _.clone(this.keysToDiscard)
    }
  },

  forView: function () {
    return _.clone(this.hash)
  }
})

NextFlash.fromSession = function (data) {
  var flash

  if (data) {
    flash = new NextFlash(data.hash, data.keysToDiscard)
  } else {
    flash = new NextFlash()
  }

  flash.sweep()

  return flash
}

module.exports = NextFlash

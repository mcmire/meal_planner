var _ = require('lodash')

function NowFlash(nextFlash) {
  this.nextFlash = nextFlash
}

_.extend(NowFlash.prototype, {
  set: function (key, value) {
    this.nextFlash.set(key, value)
    this.nextFlash.discard(key)
  },

  get: function (key) {
    return this.nextFlash.get(key)
  }
})

module.exports = NowFlash

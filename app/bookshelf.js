var _ = require('lodash')
var Bookshelf = require('bookshelf')
var Future = require('fibers/future')
var pg = require('pg')
var config = require('../config/knex')

var bookshelf = Bookshelf.initialize(config)

function getSchemaFor(tableName) {
  query = [
    'SELECT a.attname, format_type(a.atttypid, a.atttypmod) as type, d.adsrc, a.attnotnull, a.atttypid, a.atttypmod',
      'FROM pg_attribute a LEFT JOIN pg_attrdef d',
        'ON a.attrelid = d.adrelid AND a.attnum = d.adnum',
     'WHERE a.attrelid = \'', tableName, '\'::regclass',
       'AND a.attnum > 0 AND NOT a.attisdropped',
     'ORDER BY a.attnum'
  ].join("\n")

  // By this point, we are in a fiber so wrapping this in a future
  // totally works
  var result = Future.wrap(function (callback) {
    bookshelf.knex.raw(query).exec(callback)
  })().wait()

  var schema = _.reduce(result.rows, function (schema, row) {
    schema[row['attname']] = {
      type: row['type'],
      allowsNull: (row['attnotnull'] === false)
    }
    return schema
  }, {})

  //console.log({rows: result.rows, schema: schema})

  return schema
}

function typecast(value, column) {
  if (column.allowsNull && !value) {
    return null
  } else if (/int/.test(column.type)) {
    return parseInt(value, 10)
  } else {
    return value
  }
}

var Model = bookshelf.Model.extend({
  format: function (attributes, options) {
    var _this = this
    return _.reduce(attributes, function (hash, value, name) {
      value = typecast(value, _this.schema[name])
      if (value !== null) {
        hash[name] = value
      }
      return hash
    }, {})
  }
})

bookshelf.createModel = function (modelName, properties) {
  properties = _.clone(properties)

  properties.schema = getSchemaFor(properties.tableName)
  properties.modelName = modelName

  var subclass = Model.extend(properties)
  return subclass
}

module.exports = bookshelf

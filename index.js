
var pull = require('pull-stream')
var path = require('path')
var FlumeQuery = require('flumeview-query')

function isString(s) {
  return 'string' === typeof s
}

exports.name = 'talequery'
exports.version = require('./package.json').version
exports.manifest = {
  read: 'source'
}

var indexes = [
  {key: 'idea', value: [['value', 'content', 'ideaKey']] }
]

exports.init = function  (ssb, config) {
  var s = ssb._flumeUse('query', FlumeQuery(1, indexes))
  var read = s.read
  s.read = function (opts) {
    if(!opts) opts = {}
    if(isString(opts))
      opts = {query: JSON.parse(opts)}
    else if(isString(opts.query))
      opts.query = JSON.parse(opts.query)
    return read(opts)
  }
  return s
}


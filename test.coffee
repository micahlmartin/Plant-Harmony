eventEmitter = require 'events'

exports.controller = new eventEmitter.EventEmitter()

console.log 'Done loading Test'
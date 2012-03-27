settings = require './settings'

module.exports = 
	log: (message) ->
		if settings.LoggingEnabled
			console.log message
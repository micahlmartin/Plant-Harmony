express = require 'express'
settings = require './lib/settings'
repository = require './lib/plugins/' + settings.Repository

server = express.createServer();

sendRepsonse = (err, data, res) ->
	if err?
		res.send
			status:
				code: 500
				error: err
	else
		res.send
			data: data
			status:
				code: 200

server.get '/plants/types/:type', (req, res) ->
	repository.getByType req.params.type, (err, results) ->
		sendRepsonse err, results, res


server.get '/plants/search/:type', (req, res) ->
	repository.nameSearch req.params.type, (err, results) ->
		sendRepsonse err, results, res


server.listen process.env.VMC_APP_PORT || 3005, ->
	console.log 'started web server'
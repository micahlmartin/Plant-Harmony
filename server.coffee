express = require 'express'
settings = require './lib/settings'
repository = require './lib/plugins/' + settings.Repository

server = express.createServer();

server.use(express.static(__dirname + '/data'));

sendResponse = (err, data, res) ->
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
		sendResponse err, results, res


server.get '/plants/search/:type', (req, res) ->
	repository.nameSearch req.params.type, (err, results) ->
		sendResponse err, results, res

server.get '/plants/:name?', (req, res) ->
	if req.params.name?
		repository.getByName req.params.name, (err, results) ->
			sendResponse err, results, res
	else
		repository.getAll 1, 10, (err, results) ->
			sendResponse err, results, res


server.listen settings.WebServerPort, ->
	console.log 'started web server on port ' + settings.WebServerPort
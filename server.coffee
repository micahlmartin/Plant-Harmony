express = require 'express'
settings = require './lib/settings'
repository = require './lib/plugins/' + settings.Repository
less = require 'less'

###
Setup sever
###


server = express.createServer()
server.set 'view engine', 'jade'
server.set 'views', __dirname + '/views'
server.use express.static(__dirname + '/data')
server.use express.logger()
server.use express.bodyParser()


###
Define Routes
###

server.get '/', (req, res) ->
	repository.getAll 1, 10, (err, results) ->
		res.render 'index', plants: results, layout: false

server.get '/plants/:name', (req, res) ->
	repository.getByName req.params.name, (err, result) ->
		res.render 'plant', plant: result, layout: false

server.get '/api/plants/types/:type', (req, res) ->
	repository.getByType req.params.type, (err, results) ->
		sendResponse err, results, res


server.get '/api/plants/search/:type', (req, res) ->
	repository.nameSearch req.params.type, (err, results) ->
		sendResponse err, results, res

server.get '/api/plants/:name?', (req, res) ->
	if req.params.name?
		repository.getByName req.params.name, (err, results) ->
			sendResponse err, results, res
	else
		repository.getAll 1, 10, (err, results) ->
			sendResponse err, results, res


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

NotFound = (msg) ->
	this.name = 'NotFound'
	Error.call this, msg
	Error.captureStackTrace this, arguments.callee
	return

NotFound.prototype.__proto__ = Error.prototype

server.get '/404', (req, res) ->
	throw new NotFound

###
Start server
###

server.listen settings.WebServerPort, ->
	console.log 'started web server on port ' + settings.WebServerPort
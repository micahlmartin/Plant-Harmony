express = require 'express'
settings = require './lib/settings'
repository = require './lib/plugins/' + settings.Repository

server = express.createServer();

server.get '/plants/types/:type', (req, res) ->
	console.log req
	res.writeHead 200, "Content-Type" : "text/plain"
	res.end

server.listen process.env.VMC_APP_PORT || 3005, ->
	console.log 'started web server'
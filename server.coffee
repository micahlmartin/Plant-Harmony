test = require './test' 

console.log 'Done loading server'

###
express = require 'express'

app = express.createServer();

app.get '/plants/:type', (req, res) ->
	console.log req.params.type
	res.writeHead 200, "Content-Type" : "text/plain"
	##res.send req.params.type
	res.end

app.listen process.env.VMC_APP_PORT || 3006, ->
	console.log 'listening'
###
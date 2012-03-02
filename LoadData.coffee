mongodb = require 'mongodb'

fs = require 'fs'

data = eval fs.readFileSync('data/plants.json').toString()

mongoServer = new mongodb.Server '127.0.0.1', mongodb.Connection.DEFAULT_PORT
dbConnection = new mongodb.Db "plant_harmony", mongoServer
dbConnection.open (err, db) -> 
	
	console.log 'Connection opened'

	db.dropDatabase (err, result) ->
		console.log 'Dropped database'
	db.collection 'plants', (err, coll) ->
		coll.insert data
	
	db.close()

dbConnection.on 'close', ->
	console.log 'Connection closed'
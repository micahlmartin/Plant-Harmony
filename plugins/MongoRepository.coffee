mongodb = require 'mongodb'
settings = require('../lib/settings')

mongoServer = new mongodb.Server settings.DBServer, mongodb.Connection.DEFAULT_PORT 
dbConnection = new mongodb.Db "plant_harmony", mongoServer

dbConnection.on 'open', ->
	console.log 'connection opened'

dbConnection.on 'close', ->
	console.log 'connection closed'

openDB = (callback) ->
	dbConnection.open (err, db) ->
		if err
			console.log 'An error ocurred opening the database connection'
			throw err

		callback db

getCollection = (name, callback) ->
	openDB (db) ->
		db.collection name, (err, coll) ->
			console.log 'Loading collection ' + name 

			callback err, coll


module.exports = 
	getByType: (type, callback) ->
		console.log 'Search for plants of type ' + type

		getCollection 'plants', (err, coll) ->
			coll.find({ "type": type}).toArray (err, docs) ->
				dbConnection.close()
				callback docs

	getByName: (name, callback) ->
		console.log 'Find plant by name ' + name

		getCollection 'plants', (err, coll) ->
			coll.findOne { name: name }, (err, doc) ->
				dbConnection.close()
				callback doc

			
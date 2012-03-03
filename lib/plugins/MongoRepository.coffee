mongodb = require 'mongodb'
settings = require('../settings')

openDB = (callback) ->
	mongoServer = new mongodb.Server settings.DBServer, mongodb.Connection.DEFAULT_PORT 
	dbConnection = new mongodb.Db "plant_harmony", mongoServer
	dbConnection.open (err, db) ->
		if err
			console.log 'An error ocurred opening the database connection'
			throw err

		callback db

getCollection = (name, callback) ->
	openDB (db) ->
		db.collection name, (err, coll) ->
			console.log 'Loading collection ' + name 

			callback err, coll, db


module.exports = 
	getByType: (type, callback) ->
		console.log 'Search for plants of type ' + type

		getCollection 'plants', (err, coll, db) ->
			coll.find( "type": type).toArray (err, docs) ->
				db.close()
				console.log docs
				callback err, docs

	getByName: (name, callback) ->
		console.log 'Find plant by name ' + name

		getCollection 'plants', (err, coll, db) ->
			coll.findOne  name: eval '/' + name + '/i', (err, doc) ->
				db.close()
				console.log doc
				callback err, doc

	nameSearch: (term, callback) ->
		console.log 'Search plants by name ' + term

		getCollection 'plants', (err, coll, db) ->
			coll.find( name: eval '/' + term + '/i' ).toArray (err, docs) ->
				db.close()
				console.log docs
				callback err, docs
			
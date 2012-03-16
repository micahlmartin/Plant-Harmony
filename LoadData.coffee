mongodb = require 'mongodb'
fs = require 'fs'
_ = require 'underscore'
plantData = eval fs.readFileSync('data/plants.json').toString()
genusData = eval fs.readFileSync('data/genus.json').toString()

plantList = []

##load all the initial plant data
_.each plantData, (plant) ->
	plantList[plant.name] = plant

##load all the genus data
_.each genusData, (genus) ->
	_.each genus.plants, (plantName) ->
		currentPlant = plantList[plantName]
		if currentPlant?
			plantList[plantName] = type: genus.type, genus: genus.name, companions: genus.companions, foes: genus.foes

##Expand all genus names for foes and companion
_.each plantList, (plant) ->
	
	_.each plant.companions, (companion) ->


console.log plantList

###
mongoServer = new mongodb.Server '127.0.0.1', mongodb.Connection.DEFAULT_PORT
dbConnection = new mongodb.Db "plant_harmony", mongoServer
dbConnection.open (err, db) -> 
	
	if err?
		console.log err
		return
		
	console.log 'Connection opened'

	db.dropDatabase (err, result) ->
		console.log 'Dropped database'
	db.collection 'plants', (err, coll) ->
		coll.insert plants
	
	db.close()

dbConnection.on 'close', ->
	console.log 'Connection closed'
###
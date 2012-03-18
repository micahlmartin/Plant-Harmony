fs = require 'fs'
_ = require 'underscore'
mongo = require './lib/plugins/MongoRepository'
plantData = eval fs.readFileSync('data/plants.json').toString()
genusData = eval fs.readFileSync('data/genus.json').toString()

getExpandedPlants = (plantList) ->
	expandedList = [];
	if plantList?
		for plant in plantList	
			if plant.match /@.+/
				expandedList = expandedList.concat genusList[plant.substring 1].plants
			else
				expandedList.push plant	
	
	return expandedList	

##Build genus data
genusList = {}
for genus in genusData
	genusList[genus.name] = genus

_.each genusList, (genus) ->
	genus.companions = getExpandedPlants(genus.companions)
	genus.foes = getExpandedPlants(genus.foes)


##Build plant data
plantList = {}
for plant in plantData
	plantList[plant.name] = plant

_.each plantList, (plant) ->
	plant.companions = getExpandedPlants(plant.companions)
	plant.foes = getExpandedPlants(plant.foes)

plantArray = []

_.each plantList, (plant) ->
	plantArray.push plant

plants = []
_.each plantList, (plant) ->
	plants.push plant
		
mongo.openDB (db) ->
	db.dropDatabase (err, success) ->
		console.log "Dropped database" 

		db.collection 'plants', (err, collection) ->
			console.log "Recreating plant collection"
			collection.insert plantArray, (err, docs) ->
				collection.count (err, count) ->
					db.close() 
					if count == plantArray.length
						console.log "Inserted " + count + " plants"
					else
						throw "Insert failed. Expected " + plantArray.length + " but was " + count

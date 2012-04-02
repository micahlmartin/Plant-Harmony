fs = require 'fs'
_ = require 'underscore'
mongo = require './lib/plugins/MongoRepository'
settings = require './lib/settings'
utils = require './lib/utils'

module.exports = 

	execute: () ->
		plantData = eval fs.readFileSync("#{__dirname}/data/Plants.json").toString()
		genusData = eval fs.readFileSync("#{__dirname}/data/Genus.json").toString()

		getExpandedPlants = (plantList) ->
			expandedList = [];
			if plantList?
				for plant in plantList	
					if plant.match /@.+/
						expandedList =  expandedList.concat genusList[plant.substring 1].plants
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
			plant.companions = _.sortBy getExpandedPlants(plant.companions), (p) ->
				return p
			plant.foes = _.sortBy getExpandedPlants(plant.foes), (p) ->
				return p

		plantArray = []

		_.each plantList, (plant) ->
			plantArray.push plant

		plants = []
		_.each plantList, (plant) ->
			plants.push plant

		insertPlants = () ->
			mongo.openDB (db) ->

				

		mongo.openDB (db) ->
			db.collection 'plants', (err, collection) ->
				utils.log 'Dropping plants collection'
				console.log db.collection
				collection.drop () ->
					utils.log "Recreating plant collection"
					collection.insert plants, (err, docs) ->
						console.log "Inserted plants"
						collection.count (err, count) ->
							db.close() 

							if plants.length != count
								throw "Inserted #{plants.length} but #{count} are in the database"

							console.log "Database successfully updated"
							
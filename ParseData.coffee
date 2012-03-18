fs = require 'fs'
_ = require 'underscore'
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

	
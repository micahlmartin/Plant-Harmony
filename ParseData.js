(function() {
  var fs, genus, genusData, genusList, getExpandedPlants, plant, plantData, plantList, _, _i, _j, _len, _len2;

  fs = require('fs');

  _ = require('underscore');

  plantData = eval(fs.readFileSync('data/plants.json').toString());

  genusData = eval(fs.readFileSync('data/genus.json').toString());

  getExpandedPlants = function(plantList) {
    var expandedList, plant, _i, _len;
    expandedList = [];
    if (plantList != null) {
      for (_i = 0, _len = plantList.length; _i < _len; _i++) {
        plant = plantList[_i];
        if (plant.match(/@.+/)) {
          expandedList = expandedList.concat(genusList[plant.substring(1)].plants);
        } else {
          expandedList.push(plant);
        }
      }
    }
    return expandedList;
  };

  genusList = {};

  for (_i = 0, _len = genusData.length; _i < _len; _i++) {
    genus = genusData[_i];
    genusList[genus.name] = genus;
  }

  _.each(genusList, function(genus) {
    genus.companions = getExpandedPlants(genus.companions);
    return genus.foes = getExpandedPlants(genus.foes);
  });

  plantList = {};

  for (_j = 0, _len2 = plantData.length; _j < _len2; _j++) {
    plant = plantData[_j];
    plantList[plant.name] = plant;
  }

  _.each(plantList, function(plant) {
    plant.companions = getExpandedPlants(plant.companions);
    return plant.foes = getExpandedPlants(plant.foes);
  });

  /*	
  		_.each genus.companions, (companionIndex) ->
  			console.log companionIndex
  			companion = genus.companions[companionIndex]
  			if companion.match /@.+/ 
  				 ##The companion plant is a genus name so expand it
  			    companionList =	companionList.concat genusList[companion.substring 1].plants
  			else
  				companionList.push companion
  
  			genus.companions = companionList
  
  	foeList = []
  	_.each plant.foes, (foe) ->
  	if foe.match /@.+/
  		foeList = foeList.concat genusList[foe.substring 1].plants
  	else
  		foeList.push foe
  
  	genus.foes = foeList
  */

}).call(this);

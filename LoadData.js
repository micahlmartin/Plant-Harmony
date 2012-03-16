(function() {
  var fs, genusData, mongodb, plantData, plantList, _;

  mongodb = require('mongodb');

  fs = require('fs');

  _ = require('underscore');

  plantData = eval(fs.readFileSync('data/plants.json').toString());

  genusData = eval(fs.readFileSync('data/genus.json').toString());

  plantList = [];

  _.each(plantData, function(plant) {
    return plantList[plant.name] = plant;
  });

  _.each(genusData, function(genus) {
    return _.each(genus.plants, function(plantName) {
      var currentPlant;
      currentPlant = plantList[plantName];
      if (currentPlant != null) {
        return plantList[plantName] = {
          type: genus.type,
          genus: genus.name,
          companions: genus.companions,
          foes: genus.foes
        };
      }
    });
  });

  console.log(plantList);

  /*
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
  */

}).call(this);

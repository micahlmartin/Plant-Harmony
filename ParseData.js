(function() {
  var fs, genus, genusData, genusList, getExpandedPlants, insertPlants, mongo, plant, plantArray, plantData, plantList, plants, _, _i, _j, _len, _len2;

  fs = require('fs');

  _ = require('underscore');

  mongo = require('./lib/plugins/MongoRepository');

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

  plantArray = [];

  _.each(plantList, function(plant) {
    return plantArray.push(plant);
  });

  plants = [];

  _.each(plantList, function(plant) {
    return plants.push(plant);
  });

  insertPlants = function() {
    return mongo.openDB(function(db) {});
  };

  mongo.openDB(function(db) {
    return db.dropDatabase(function(err, success) {
      console.log("Dropped database");
      return db.collection('plants', function(err, collection) {
        console.log("Recreating plant collection");
        return collection.insert(plants, function(err, docs) {
          console.log("Inserted plants");
          return collection.count(function(err, count) {
            db.close();
            if (plants.length !== count) {
              throw "Inserted " + plants.length + " but only " + count + " are in the database";
            }
            return console.log("Database successfully updated");
          });
        });
      });
    });
  });

}).call(this);

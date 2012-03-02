(function() {
  var dbConnection, getCollection, mongoServer, mongodb, openDB, settings;

  mongodb = require('mongodb');

  settings = require('../lib/settings');

  mongoServer = new mongodb.Server(settings.DBServer, mongodb.Connection.DEFAULT_PORT);

  dbConnection = new mongodb.Db("plant_harmony", mongoServer);

  dbConnection.on('open', function() {
    return console.log('connection opened');
  });

  dbConnection.on('close', function() {
    return console.log('connection closed');
  });

  openDB = function(callback) {
    return dbConnection.open(function(err, db) {
      if (err) {
        console.log('An error ocurred opening the database connection');
        throw err;
      }
      return callback(db);
    });
  };

  getCollection = function(name, callback) {
    return openDB(function(db) {
      return db.collection(name, function(err, coll) {
        console.log('Loading collection ' + name);
        return callback(err, coll);
      });
    });
  };

  module.exports = {
    getByType: function(type, callback) {
      console.log('Search for plants of type ' + type);
      return getCollection('plants', function(err, coll) {
        return coll.find({
          "type": type
        }).toArray(function(err, docs) {
          dbConnection.close();
          return callback(docs);
        });
      });
    },
    getByName: function(name, callback) {
      console.log('Find plant by name ' + name);
      return getCollection('plants', function(err, coll) {
        return coll.findOne({
          name: name
        }, function(err, doc) {
          dbConnection.close();
          return callback(doc);
        });
      });
    }
  };

}).call(this);

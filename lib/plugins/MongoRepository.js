(function() {
  var getCollection, mongodb, openDB, settings;

  mongodb = require('mongodb');

  settings = require('../settings');

  openDB = function(callback) {
    var dbConnection, mongoServer;
    mongoServer = new mongodb.Server(settings.DBServer, mongodb.Connection.DEFAULT_PORT);
    dbConnection = new mongodb.Db("plant_harmony", mongoServer);
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
        return callback(err, coll, db);
      });
    });
  };

  module.exports = {
    getByType: function(type, callback) {
      console.log('Search for plants of type ' + type);
      return getCollection('plants', function(err, coll, db) {
        return coll.find({
          "type": type
        }).toArray(function(err, docs) {
          db.close();
          console.log(docs);
          return callback(err, docs);
        });
      });
    },
    getByName: function(name, callback) {
      console.log('Find plant by name ' + name);
      return getCollection('plants', function(err, coll, db) {
        return coll.findOne({
          name: eval('/' + name + '/i')
        }, function(err, doc) {
          db.close();
          console.log(doc);
          return callback(err, doc);
        });
      });
    },
    nameSearch: function(term, callback) {
      console.log('Search plants by name ' + term);
      return getCollection('plants', function(err, coll, db) {
        return coll.find({
          name: eval('/' + term + '/i')
        }).toArray(function(err, docs) {
          db.close();
          console.log(docs);
          return callback(err, docs);
        });
      });
    }
  };

}).call(this);

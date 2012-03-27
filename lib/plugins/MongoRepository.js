(function() {
  var getCollection, mongodb, openDB, settings, utils;

  mongodb = require('mongodb');

  settings = require('../settings');

  utils = require('../utils');

  openDB = function(callback) {
    var dbConnection, mongoServer;
    mongoServer = new mongodb.Server(settings.DBServer, mongodb.Connection.DEFAULT_PORT);
    dbConnection = new mongodb.Db("plant_harmony", mongoServer);
    return dbConnection.open(function(err, db) {
      if (err) {
        utils.log('An error ocurred opening the database connection');
        throw err;
      }
      return callback(db);
    });
  };

  getCollection = function(name, callback) {
    return openDB(function(db) {
      return db.collection(name, function(err, coll) {
        utils.log('Loading collection ' + name);
        return callback(err, coll, db);
      });
    });
  };

  module.exports = {
    openDB: openDB,
    getCollection: getCollection,
    getAll: function(pageNumber, pageCount, callback) {
      utils.log('Returning all plants ' + pageNumber + ' ' + pageCount);
      pageNumber = Math.max(pageNumber || 1);
      pageCount = Math.min(pageCount || 10);
      return getCollection('plants', function(err, coll, db) {
        return coll.find({}, {
          "limit": pageCount,
          "skip": pageNumber * pageCount
        }).toArray(function(err, docs) {
          db.close();
          utils.log(docs);
          return callback(err, docs);
        });
      });
    },
    getByType: function(type, callback) {
      utils.log('Search for plants of type ' + type);
      return getCollection('plants', function(err, coll, db) {
        return coll.find({
          "type": type
        }).toArray(function(err, docs) {
          db.close();
          utils.log(docs);
          return callback(err, docs);
        });
      });
    },
    getByName: function(name, callback) {
      utils.log('Find plant by name ' + name);
      return getCollection('plants', function(err, coll, db) {
        return coll.findOne({
          name: eval('/' + name + '/i')
        }, function(err, doc) {
          db.close();
          utils.log(doc);
          return callback(err, doc);
        });
      });
    },
    nameSearch: function(term, callback) {
      utils.log('Search plants by name ' + term);
      return getCollection('plants', function(err, coll, db) {
        return coll.find({
          name: eval('/' + term + '/i')
        }).toArray(function(err, docs) {
          db.close();
          utils.log(docs);
          return callback(err, docs);
        });
      });
    }
  };

}).call(this);

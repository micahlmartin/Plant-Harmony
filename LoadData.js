(function() {
  var data, dbConnection, fs, mongoServer, mongodb;

  mongodb = require('mongodb');

  fs = require('fs');

  data = eval(fs.readFileSync('data/plants.json').toString());

  mongoServer = new mongodb.Server('127.0.0.1', mongodb.Connection.DEFAULT_PORT);

  dbConnection = new mongodb.Db("plant_harmony", mongoServer);

  dbConnection.open(function(err, db) {
    if (err != null) {
      console.log(err);
      return;
    }
    console.log('Connection opened');
    db.dropDatabase(function(err, result) {
      return console.log('Dropped database');
    });
    db.collection('plants', function(err, coll) {
      return coll.insert(data);
    });
    return db.close();
  });

  dbConnection.on('close', function() {
    return console.log('Connection closed');
  });

}).call(this);

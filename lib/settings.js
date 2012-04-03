(function() {
  var mongodb;

  mongodb = require('mongodb');

  module.exports = {
    mongo: {
      "host": process.env["MONGO_HOST"] || "127.0.0.1",
      "port": parseInt(process.env["MONGO_PORT"] || 27017),
      "username": process.env["MONGO_USERNAME"],
      "password": process.env["MONGO_PASSWORD"],
      "db": process.env["MONGO_DB"] || "plants"
    },
    Repository: process.env["MONGO_DB"] || 'MongoRepository',
    LoggingEnabled: process.env["MONGO_DB"] || false,
    WebServerPort: process.env.PORT || 3000
  };

}).call(this);

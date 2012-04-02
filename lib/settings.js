(function() {
  var mongodb;

  mongodb = require('mongodb');

  module.exports = {
    mongo: {
      "host": process.env["MONGO_HOST"],
      "port": parseInt(process.env["MONGO_PORT"]),
      "username": process.env["MONGO_USERNAME"],
      "password": process.env["MONGO_PASSWORD"],
      "db": process.env["MONGO_DB"]
    },
    Repository: 'MongoRepository',
    LoggingEnabled: true,
    WebServerPort: process.env.PORT || 3000
  };

}).call(this);

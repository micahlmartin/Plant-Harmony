(function() {
  var mongodb;

  mongodb = require('mongodb');

  module.exports = {
    DBServer: '127.0.0.1',
    Repository: 'MongoRepository',
    LoggingEnabled: false,
    WebServerPort: process.env.VMC_APP_PORT || 3010
  };

}).call(this);

(function() {
  var settings;

  settings = require('./settings');

  module.exports = {
    log: function(message) {
      if (settings.LoggingEnabled) return console.log(message);
    }
  };

}).call(this);

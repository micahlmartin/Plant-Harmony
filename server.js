(function() {
  var express, repository, sendRepsonse, server, settings;

  express = require('express');

  settings = require('./lib/settings');

  repository = require('./lib/plugins/' + settings.Repository);

  server = express.createServer();

  sendRepsonse = function(err, data, res) {
    if (err != null) {
      return res.send({
        status: {
          code: 500,
          error: err
        }
      });
    } else {
      return res.send({
        data: data,
        status: {
          code: 200
        }
      });
    }
  };

  server.get('/plants/types/:type', function(req, res) {
    return repository.getByType(req.params.type, function(err, results) {
      return sendRepsonse(err, results, res);
    });
  });

  server.get('/plants/search/:type', function(req, res) {
    return repository.nameSearch(req.params.type, function(err, results) {
      return sendRepsonse(err, results, res);
    });
  });

  server.listen(process.env.VMC_APP_PORT || 3005, function() {
    return console.log('started web server');
  });

}).call(this);

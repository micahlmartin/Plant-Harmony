(function() {
  var express, repository, sendResponse, server, settings;

  express = require('express');

  settings = require('./lib/settings');

  repository = require('./lib/plugins/' + settings.Repository);

  server = express.createServer();

  server.use(express.static(__dirname + '/data'));

  sendResponse = function(err, data, res) {
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
      return sendResponse(err, results, res);
    });
  });

  server.get('/plants/search/:type', function(req, res) {
    return repository.nameSearch(req.params.type, function(err, results) {
      return sendResponse(err, results, res);
    });
  });

  server.get('/plants/:name?', function(req, res) {
    if (req.params.name != null) {
      return repository.getByName(req.params.name, function(err, results) {
        return sendResponse(err, results, res);
      });
    } else {
      return repository.getAll(1, 10, function(err, results) {
        return sendResponse(err, results, res);
      });
    }
  });

  server.listen(settings.WebServerPort, function() {
    return console.log('started web server on port ' + settings.WebServerPort);
  });

}).call(this);

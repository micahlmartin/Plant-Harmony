(function() {
  var express, repository, server, settings;

  express = require('express');

  settings = require('./lib/settings');

  repository = require('./lib/plugins/' + settings.Repository);

  server = express.createServer();

  server.get('/plants/types/:type', function(req, res) {
    console.log(req);
    res.writeHead(200, {
      "Content-Type": "text/plain"
    });
    return res.end;
  });

  server.listen(process.env.VMC_APP_PORT || 3005, function() {
    return console.log('started web server');
  });

}).call(this);

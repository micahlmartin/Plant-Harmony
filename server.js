(function() {
  var NotFound, express, less, repository, sendResponse, server, settings;

  express = require('express');

  settings = require('./lib/settings');

  repository = require('./lib/plugins/' + settings.Repository);

  less = require('less');

  console.log(less.middleware);

  /*
  Setup sever
  */

  server = express.createServer();

  server.set('view engine', 'jade');

  server.set('views', __dirname + '/views');

  server.use(express.compiler({
    src: __dirname + '/data',
    enable: ['less']
  }));

  server.use(express.static(__dirname + '/data'));

  server.use(express.logger());

  server.use(express.bodyParser());

  /*
  Define Routes
  */

  server.get('/', function(req, res) {
    console.log('Index page');
    return res.render('index', {
      pageTitle: 'Test',
      youAreUsingJade: true,
      layout: false
    });
  });

  server.get('/api/plants/types/:type', function(req, res) {
    return repository.getByType(req.params.type, function(err, results) {
      return sendResponse(err, results, res);
    });
  });

  server.get('/api/plants/search/:type', function(req, res) {
    return repository.nameSearch(req.params.type, function(err, results) {
      return sendResponse(err, results, res);
    });
  });

  server.get('/api/plants/:name?', function(req, res) {
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

  NotFound = function(msg) {
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
  };

  NotFound.prototype.__proto__ = Error.prototype;

  server.get('/404', function(req, res) {
    throw new NotFound;
  });

  /*
  Start server
  */

  server.listen(settings.WebServerPort, function() {
    return console.log('started web server on port ' + settings.WebServerPort);
  });

}).call(this);

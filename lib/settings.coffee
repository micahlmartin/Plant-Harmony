mongodb = require 'mongodb'


module.exports =
		DBServer: '127.0.0.1',
		Repository: 'MongoRepository',
		LoggingEnabled: true,
		WebServerPort: process.env.VMC_APP_PORT || 3010
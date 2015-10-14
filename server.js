var http = require('http')
, app = require('./config/express')()
, config = require('./config/config')();
require('./config/passport')();
require('./config/database.js')(config.db);

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server online, porta: " + app.get('port'));
});

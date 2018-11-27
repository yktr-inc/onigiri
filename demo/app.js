var http = require('http');
var { router } = require('../src/index');
const routes = require('./routes');

var server = http.createServer(function(req, res) {
    router.handle(req,res,routes);
}); 

server.listen(8080);
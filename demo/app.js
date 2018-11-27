var http = require('http');
var router = require('../src/router');

var server = http.createServer(function(req, res) {  
    router.handle(req,res);
}); 

server.listen(8080);
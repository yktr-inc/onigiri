var http = require('http');
var server = http.createServer(function(req, res) {

res.writeHead(200);

res.end('MVC!');

});

server.listen(9000);
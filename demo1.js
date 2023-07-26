var http = require('http');

http.createServer(function (req, res) {
  res.write('Hello World Welcome to this tutorial')
}).listen(8080);
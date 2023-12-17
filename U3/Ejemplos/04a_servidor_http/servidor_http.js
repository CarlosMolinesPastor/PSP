const http = require("http");

const requestListener = function (request, response) {
  console.log("Se ha recibido una petición")
};

const server = http.createServer(requestListener);

server.listen(8080); // Puerto 80

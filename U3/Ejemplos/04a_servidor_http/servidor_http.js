const http = require("http");

//Declaramos un requestListener que tiene dos objetos el request y el response
const requestListener = function (request, response) {
  console.log("Se ha recibido una petición")
};
//Declaranmos el servidor con el comando createServer y el request
const server = http.createServer(requestListener);

//Lo levantamos
server.listen(80); // Puerto 80

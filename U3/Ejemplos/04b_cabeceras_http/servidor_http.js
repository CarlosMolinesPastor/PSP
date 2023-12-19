const http = require("http");

//Declaramos el requestListener con el request que lo mostramos por consola
const requestListener = function (request, response) {
  console.log("Se ha recibido una petición");
  console.log("URL: " + request.url);
  console.log("Metodo: " + request.Method);
  console.log("Algunos campos de cabecera: ");
  console.log("Host: " + request.headers["host"]);
  console.log("User-Agent: " + request.headers["user-agent"]);
  console.log("Accept-Language: " + request.headers["accept-language"]);
};

//Creamos el servidor
const server = http.createServer(requestListener);

//Lo ponemos en escucha
server.listen(80); // Puerto 80

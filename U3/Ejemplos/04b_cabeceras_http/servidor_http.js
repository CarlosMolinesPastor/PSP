const http = require("http");

const requestListener = function (request, response) {
  console.log("Se ha recibido una petición");
  console.log("URL: " + request.url);
  console.log("Metodo: " + request.Method);
  console.log("Algunos campos de cabecera: ");
  console.log("Host: " + request.headers["host"]);
  console.log("User-Agent: " + request.headers["user-agent"]);
  console.log("Accept-Language: " + request.headers["accept-language"]);
};

const server = http.createServer(requestListener);

server.listen(80); // Puerto 80

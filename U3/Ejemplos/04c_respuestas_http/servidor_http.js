const http = require('http');

const requestListener = function (request, response) {
  console.log("Se ha recibido una petición");
  console.log("URL: " + request.url);
  console.log("Metodo: " + request.Method);
  console.log("Algunos campos de cabecera: ");
  console.log("Host: " + request.headers["host"]);
  console.log("User-Agent: " + request.headers["user-agent"]);
  console.log("Accept-Language: " + request.headers["accept-language"]);
  //Iniciamos las respuestas
  response.setHeader("Content-Type", "text/html");
  response.writeHead(200, { "Content-Length": "text/html" });
  response.write("<h1>Hola mundo!</h1>");
  response.end("<h2>Adios mundo!</h2>");
};


const server = http.createServer(requestListener);

server.listen(80); // Puerto 80

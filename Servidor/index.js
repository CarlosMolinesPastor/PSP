// Servidor
const http = require("http");
const hostname = "localhost";
const port = 3000;

const url = require("url"); //Barra navegacion
const path = require("path"); //Rutas
const fs = require("fs"); //Archivos

const requestListener = (req, res) => {
  let url_parts = url.parse(req.url, true);
  console.log(url_parts);
  console.log(url_parts.query.reBusqueda);

  let todaLaCadena = "." + url_parts.pathname;
  console.log("TodaLaCadena .url_parts.pathname: " + todaLaCadena);

  let extensionFuncion = cortar(url_parts.pathname);
  console.log("extensionFuncion : " + extensionFuncion);

  let extension = path.extname(todaLaCadena);
  console.log("extension con let: " + extension);

  let ext = path.extname("." + url_parts.pathname);
  console.log("extension todo junto: " + ext);

  let contenType = getContenType(todaLaCadena);
  console.log("contenType: " + contenType);

  res.writeHead(200, { "Content-Type": contenType });
  res.end("Hello World");
};

function cortar(cadena) {
  let data;

  console.log(cadena);
  data = path.extname("." + cadena);
  return data;
}

function getContenType(cadena) {
  let datos;
  datos = path.extname("." + cadena);
  let tip;
  switch (datos) {
    case ".html":
      tip = "text/html";
      break;
    case ".js":
      tip = "text/javascript";
    default:
      "text/html";
      break;
  }
  return tip || "text/html";
}

// ################## Lanzamiento Servidor ##################
const server = http.createServer(requestListener);

server.listen(port, hostname, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Servidor iniciado en http://${hostname}:${port}/`);
});

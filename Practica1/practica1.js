//Importamos modulo http que nos proporciona un servidor HTTP
const http = require("http");
//Importamos modulo fs que nos permite trabajar con archivos del sistema
const fs = require("fs");
//Importamos modulo path que nos permite trabajar con rutas
const path = require("path");
// Importamos nuestro modulo contentTypes.js
const getContentType = require('./contentTypes');
var url = require('url');

//Definimos nombre del host y puerto de acceso ya que el 80 esta reservado en linux
const hostname = "localhost";
const port = 3000;

//Definimos el listener del servidor que se ejecutara cada vez que se reciba 
//una peticion por el servidor, la forman request (solicitud) y response (respuesta)
const requestListener = function (request, response) {    
    //Creamos una variable que contendra la ruta del archivo a cargar
    let url_parts = url.parse(request.url, true);
    //Creamos la variable filePath que contendra la ruta del archivo que la conseguimos por la url
    let filePath = '.' + url_parts.pathname
    //Creamos la variable ext que contendra la extension del archivo
    let ext = path.extname(filePath);
    // CASOS DE VERIFICACION DE LA RUTA DEL ARCHIVO SOLICITADO
    //Si el archivo esta en la carpeta raiz del servidor, cambiamos la ruta por ./index.html
    if (filePath == './') {
        filePath = './index.html';
    }

    // Si la solicitud es para styles.css lo cambiamos por estilos.css
    if (filePath == './styles.css') {
        // Cambiamos el nombre del archivo solicitado a estilos.css
        filePath = './estilos.css';
        // Indicamos al cliente que el recurso ha sido movido a una nueva ubicación
        response.writeHead(301, { 'Location': '/estilos.css' });
        response.end();
        return; // Detenemos la ejecución después de la redirección
    }

    //Si el idioma solicitado es 'en' creamos variable fileName que contendra el nombre del archivo, y por ultimo la ruta del archivo
    if (url_parts.query.lang == 'en') {
        let fileName = path.basename(filePath, ext);
        filePath = `./en${fileName}${ext}`;
    }
  
    //Imprimimos el valor de la variable filePath para ver la ruta del archivo solicitado para tener una mejor comprension
    console.log(filePath);

    //Inicializamos la variable contentType con el modulo que hemos realizado
    //que pasandole como argumento la extension del archivo nos devuelve el tipo de contenido
    let contentType = getContentType(ext);
    
    //Lee el archivo en la ruta especificada por filePath, cuando la lectura se completa
    //ejecuta la funcion callback que recibe dos parametros, err y data
    fs.readFile(filePath, (err, data) => {
        //Si hay un error, responde con un mensaje de error
        if (err) {
            response.writeHead(500);
            response.end("Error al cargar el archivo: " + filePath);
            //Si no hay error, responde con el archivo
        } else {
            //Responde con el estado 200 de exito y establece el encabezado Content-Type con el valor
            //contentType que definimos antes
            response.writeHead(200, { 'Content-Type': contentType });
            //Termina la respuesta con el contenido del archivo
            response.end(data);
        }
    });
}
//Crea el servidor HTTP con el listener definido antes y lo pone a la escucha en el puerto y host
const server = http.createServer(requestListener);

server.listen(port, hostname, () => {
    //Muestra un mensaje por consola indicando que el servidor se ha iniciado
    console.log(`El servidor se ha iniciado en http://${hostname}:${port}/`);
});

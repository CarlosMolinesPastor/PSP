// contentTypes.js
// Definimos un objeto que contiene los tipos de contenido que acepta el servidor
const contentTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.jpg': 'image/jpg',
    // Se pueden añadir mas contenidos como png,etc
};
// Funcion para obtener el tipo de contenido de un archivo
// Recibe como argumento la extension del archivo
function getContentType(extname) {
    // Devolvemos el tipo de contenido del archivo o text/html por defecto
    return contentTypes[extname] || 'text/html';
}
// Exportamos la funcion como un objeto
module.exports = getContentType;

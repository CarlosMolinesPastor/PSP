// Este archivo contiene las funciones que se utilizan en el archivo index.html

//##################################### POST ##############################################. 
function createCliente() {
  // Obtener los valores de los campos de entrada
  const nombre = document.getElementById('nombre').value;
  const edad = document.getElementById('edad').value;
  const direccion = document.getElementById('direccion').value;
  const poblacion = document.getElementById('poblacion').value;
  const tratamiento = document.getElementById('tratamiento').value;
  if (edad !== '' && isNaN(edad)) {
    document.getElementById('newClient').innerText = 'La edad debe ser un número';
    return;
  }
  // Enviar una solicitud POST al servidor
  fetch('/clientes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Convertir los valores de los campos de entrada a un objeto JSON
    body: JSON.stringify({ nombre, edad, direccion, poblacion, tratamiento }),
  })
    // Convertir la respuesta a un objeto JSON
    .then(response => {
      if (!response.ok) {
        throw new Error('Cliente no encontrado');
      }
      return response.json();
    })
    // Imprimir la respuesta en la consola
    .then(data => {
      console.log(data),
        // Obtener todos los documentos de la base de datos y mostrarlos en la página
        getAllDocuments();
    })
    // Imprimir errores en la consola
    .catch(error => {
      document.getElementById('newClient').innerText = error.message;
    });
  // Después de crear el cliente, limpia los campos de entrada
  document.getElementById('nombre').value = '';
  document.getElementById('edad').value = '';
  document.getElementById('direccion').value = '';
  document.getElementById('poblacion').value = '';
  document.getElementById('tratamiento').value = '';
}

//##################################### GET ##############################################.
// Función para crear una tabla HTML a partir de un array de clientes
function createTable(clientes, includeHeaders) {
  let table = '<table>';

  // Agregar los encabezados si includeHeaders es true
  if (includeHeaders) {
    table += `
      <tr>
        <th>Copiar ID</th>
        <th>ID</th>
        <th>Nombre</th>
        <th>Edad</th>
        <th>Dirección</th>
        <th>Población</th>
        <th>Tratamiento</th>
      </tr>`;
  }

  // Agregar cada cliente como una fila en la tabla
  clientes.forEach((cliente) => {
    table += `
      <tr>
        <td><button onclick="copyToClipboard('${cliente._id}')">Copiar</button></td>
        <td>${cliente._id}</td>
        <td>${cliente.nombre}</td>
        <td>${cliente.edad}</td>
        <td>${cliente.direccion}</td>
        <td>${cliente.poblacion}</td>
        <td>${cliente.tratamiento}</td>
      </tr>`;
  });
  // Cerrar la tabla y devolverla
  table += '</table>';
  return table;
}

// Función para obtener todos los documentos de la base de datos
function getAllDocuments() {
  // Enviar una solicitud GET al servidor
  fetch('/clientes')
    // Convertir la respuesta a un objeto JSON
    .then(response => response.json())
    // Crear una tabla HTML a partir de los datos y mostrarla en la página
    .then(data => {
      const allDocuments = document.getElementById('allDocuments');
      allDocuments.innerHTML = createTable(data, true);
    })
    // Imprimir errores en la consola
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Función para obtener un documento por su ID
function getDocumentById() {
  // Obtener el valor del campo de entrada
  const id = document.getElementById('documentId').value;
  //  Enviar una solicitud GET al servidor
  fetch(`/clientes/${id}`)
    // Convertir la respuesta a un objeto JSON
    .then(response => {
      if (!response.ok) {
        throw new Error('Error, cliente no encontrado');
      }
      return response.json();
    })
    // Crear una tabla HTML a partir de los datos y mostrarla en la página
    .then(data => {
      const singleDocument = document.getElementById('singleDocument');
      singleDocument.innerHTML = createTable([data], true);
    })
    // Imprimir errores en la consola
    .catch(error => {
      document.getElementById('singleDocument').innerText = error.message;
    });
}

// ##################################### DELETE ##############################################.
// Función para borrar un documento por su ID
function deleteCliente() {
  // Obtener el valor del campo de entrada
  const id = document.getElementById('deleteId').value;
  // Enviar una solicitud DELETE al servidor
  fetch(`/clientes/${id}`, {
    method: 'DELETE',
  })
    // Convertir la respuesta a un objeto JSON
    .then(response => {
      if (!response.ok) {
        throw new Error('Cliente no encontrado');
      }
      // Obtener todos los documentos de la base de datos y mostrarlos en la página
      return response.json();
    })
    //  Imprimir errores en la consola
    .then(data => {
      console.log('Cliente borrado', data);
      // Obtener todos los documentos de la base de datos y mostrarlos en la página actualizamos la tabla
      getAllDocuments();
    })
    // Imprimir errores en la consola
    .catch(error => {
      document.getElementById('deleteOne').innerText = error.message;
    });
}

// Función para borrar todos los documentos de la base de datos
function deleteAll() {
  fetch('/clientes', {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al borrar todos los clientes');
      }
      return response.json();
    })
    .then(data => {
      console.log('Todos los clientes borrados', data);
      // Obtener todos los documentos de la base de datos y mostrarlos en la página
      getAllDocuments();
    })
    .catch(error => {
      document.getElementById('deleteAll').innerText = error.message;
    });
}

// ##################################### PUT ##############################################.
// Función para actualizar un documento por su ID
function updateCliente() {
  // Obtener los valores de los campos de entrada
  const id = document.getElementById('updateId').value;
  const nombre = document.getElementById('updateNombre').value;
  const edad = document.getElementById('updateEdad').value;
  const direccion = document.getElementById('updateDireccion').value;
  const poblacion = document.getElementById('updatePoblacion').value;
  const tratamiento = document.getElementById('updateTratamiento').value;
  // Enviar una solicitud PUT al servidor
  fetch(`/clientes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    // Convertir los valores de los campos de entrada a un objeto JSON
    body: JSON.stringify({ nombre, edad, direccion, poblacion, tratamiento }),
  })
    // Convertir la respuesta a un objeto JSON
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al actualizar el cliente');
      }
      // Realizar una segunda solicitud GET para obtener el cliente actualizado para despues al actualizar la tabla se muestre el cliente actualizado
      return fetch(`/clientes/${id}`);
    })
    // Convertir la respuesta a un objeto JSON
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener el cliente actualizado');
      }
      return response.json();
    })
    // Crear una tabla HTML a partir de los datos y mostrarla en la página
    .then(data => {
      const searchResult = document.getElementById('updatedClient');
      searchResult.innerHTML = createTable([data], true);
      // Obtener todos los documentos de la base de datos y mostrarlos en la página
      getAllDocuments();
    })
    .catch(error => {
      document.getElementById('updatedClient').innerText = error.message;
    });
}

// Función para buscar un cliente por su nombre y edad
function searchCliente() {
  // Obtener los valores de los campos de entrada
  const nombre = document.getElementById('searchNombre').value;
  const edad = document.getElementById('searchEdad').value;
  // Enviar una solicitud GET al servidor
  fetch(`/clientes/search?nombre=${nombre}&edad=${edad}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('No se encontró el cliente');
      }
      return response.json();
    })
    .then(data => {
      const searchResult = document.getElementById('searchResult');
      // Pasamos 'data' directamente a 'createTable', no necesitamos envolverlo en un array adicional
      searchResult.innerHTML = createTable(data, true);
    })
    // Imprimir errores en la consola
    .catch(error => {
      document.getElementById('searchResult').innerText = error.message;
    });
}

//##################################### ALTERNATIVE ##############################################.
// Función para copiar texto al portapapeles.
function copyToClipboard(text) {
  var textarea = document.createElement("textarea");
  textarea.textContent = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

// Exportar las funciones para que estén disponibles en index.html
module.exports = {
  createCliente,
  createTable,
  copyToClipboard,
  getAllDocuments,
  getDocumentById,
  deleteCliente,
  updateCliente,
  searchCliente,
  deleteAll,
};
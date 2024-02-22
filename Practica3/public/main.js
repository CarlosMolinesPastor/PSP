function createCliente() {
  const nombre = document.getElementById('nombre').value;
  const edad = document.getElementById('edad').value;
  const direccion = document.getElementById('direccion').value;
  const poblacion = document.getElementById('poblacion').value;
  const tratamiento = document.getElementById('tratamiento').value;

  fetch('/clientes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, edad, direccion, poblacion, tratamiento }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data),
        getAllDocuments();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  // Después de crear el cliente, limpia los campos de entrada
  document.getElementById('nombre').value = '';
  document.getElementById('edad').value = '';
  document.getElementById('direccion').value = '';
  document.getElementById('poblacion').value = '';
  document.getElementById('tratamiento').value = '';
}

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

  table += '</table>';
  return table;
}

function copyToClipboard(text) {
  var textarea = document.createElement("textarea");
  textarea.textContent = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

function getAllDocuments() {
  fetch('/clientes')
    .then(response => response.json())
    .then(data => {
      const allDocuments = document.getElementById('allDocuments');
      allDocuments.innerHTML = createTable(data, true);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function getDocumentById() {
  const id = document.getElementById('documentId').value;

  fetch(`/clientes/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error, cliente no encontrado');
      }
      return response.json();
    })
    .then(data => {
      const singleDocument = document.getElementById('singleDocument');
      singleDocument.innerHTML = createTable([data], true);
    })
    .catch(error => {
      document.getElementById('singleDocument').innerText = error.message;
    });
}

function deleteCliente() {
  const id = document.getElementById('deleteId').value;

  fetch(`/clientes/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al borrar el cliente');
      }
      return response.json();
    })
    .then(data => {
      console.log('Cliente borrado', data);
      getAllDocuments();
    })
    .catch(error => {
      document.getElementById('searchResult').innerText = error.message;
    });
}

function updateCliente() {
  const id = document.getElementById('updateId').value;
  const nombre = document.getElementById('updateNombre').value;
  const edad = document.getElementById('updateEdad').value;
  const direccion = document.getElementById('updateDireccion').value;
  const poblacion = document.getElementById('updatePoblacion').value;
  const tratamiento = document.getElementById('updateTratamiento').value;

  fetch(`/clientes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, edad, direccion, poblacion, tratamiento }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al actualizar el cliente');
      }
      // Realizar una segunda solicitud GET para obtener el cliente actualizado
      return fetch(`/clientes/${id}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener el cliente actualizado');
      }
      return response.json();
    })
    .then(data => {
      const searchResult = document.getElementById('updatedClient');
      searchResult.innerHTML = createTable([data], true);
      getAllDocuments();
    })
    .catch(error => {
      document.getElementById('updatedClient').innerText = error.message;
    });
}

function searchCliente() {
  const nombre = document.getElementById('searchNombre').value;
  const edad = document.getElementById('searchEdad').value;

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
    .catch(error => {
      document.getElementById('searchResult').innerText = error.message;
    });
}

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
      getAllDocuments();
    })
    .catch(error => {
      document.getElementById('deleteAll').innerText = error.message;
    });
}

module.exports = {
  createCliente,
  createTable,
  copyToClipboard,
  getAllDocuments,
  getDocumentById,
  deleteCliente,
  updateCliente,
  searchCliente,
  deleteAll
};
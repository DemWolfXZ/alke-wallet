// ====================================
// GESTIÓN DE CONTACTOS - MENU.HTML
// ====================================

// Clave para localStorage
const CONTACTOS_KEY = 'wallet_contactos';

// Array de contactos en memoria
let datoscontactos = [];

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
  // Obtenemos la referencia al botón "Guardar" del modal
  const botonAgregarContacto = document.getElementById('guardarContacto');
  
  // Obtenemos la referencia a la <ul> donde mostraremos los contactos
  const listaContactos = document.getElementById('listaContactos');

  // 1) Cargar contactos desde localStorage (si existen)
  datoscontactos = cargarContactosDeLocalStorage();

  // 2) Dibujar en el HTML los contactos que ya existan
  renderizarContactos(listaContactos, datoscontactos);

  // 3) Configurar el click del botón "Guardar"
  botonAgregarContacto.addEventListener('click', function () {
    console.log('Se hizo click en guardar contacto');

    // Leemos los valores escritos en el formulario
    const correo = document.getElementById('correoContacto').value.trim();
    const nombre = document.getElementById('nombreContacto').value.trim();
    const tipoTarjeta = document.getElementById('tipoTarjeta').value;
    const numeroCuenta = document.getElementById('numeroCuenta').value.trim();

    // Validaciones simples para evitar guardar campos vacíos
    if (!correo || !nombre || !numeroCuenta || tipoTarjeta === 'Tipo de tarjeta') {
      alert('Por favor completa todos los campos antes de guardar.');
      return; // Salimos de la función si faltan datos
    }

    // Creamos el objeto contacto
    const nuevoContacto = {
      correo: correo,
      nombre: nombre,
      tipoTarjeta: tipoTarjeta,
      numeroCuenta: numeroCuenta
    };

    console.log('Nuevo contacto:', nuevoContacto);

    // Agregamos el contacto al array en memoria
    datoscontactos.push(nuevoContacto);

    // Guardamos el array actualizado en localStorage
    guardarContactosEnLocalStorage(datoscontactos);

    // Volvemos a dibujar la lista en el HTML
    renderizarContactos(listaContactos, datoscontactos);

    // Limpiamos el formulario del modal
    limpiarFormularioContacto();

    // Cerramos el modal usando Bootstrap (opcional pero bonito)
    const modalElement = document.getElementById('staticBackdrop');
    const modalBootstrap = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modalBootstrap.hide();
  });

  // -------------------------------
  // 4) Lógica de saldo (tu código original ajustado)
  // -------------------------------
  // Con jQuery porque ya lo estás usando en el HTML

  $(document).ready(function () {
    // Leemos el saldo desde localStorage, si no hay nada usamos 0
    const saldoGuardado = localStorage.getItem('saldo') || '0';
    $('#saldo').text(parseFloat(saldoGuardado).toFixed(2));

    // OJO: en tu HTML los botones de Depositar y Retirar no tienen id.
    // Si quieres que esto funcione, debes poner
    // id="btnDepositar" e id="btnEnviarDinero" en los botones.
    $('#btnDepositar').click(function () {
      $('#alert-container').html(
        '<div class="alert alert-info">Redirigiendo a Depositar</div>'
      );
      setTimeout(function () {
        window.location.href = 'deposit.html';
      }, 1000);
    });

    $('#btnEnviarDinero').click(function () {
      $('#alert-container').html(
        '<div class="alert alert-info">Redirigiendo a Enviar Dinero</div>'
      );
      setTimeout(function () {
        window.location.href = 'sendmoney.html';
      }, 1000);
    });

    $('#btnUltimosMovimientos').click(function (e) {
      // Si quieres que NO cambie de página de inmediato y solo muestre el mensaje:
      e.preventDefault();
      $('#alert-container').html(
        '<div class="alert alert-info">Redirigiendo a Últimos Movimientos</div>'
      );
      setTimeout(function () {
        window.location.href = 'transactions.html';
      }, 1000);
    });
  });
});

// -------------------------------
// Función: cargarContactosDeLocalStorage
// Lee la lista de contactos desde localStorage
// -------------------------------
function cargarContactosDeLocalStorage() {
  // Obtenemos el string guardado
  const contactosString = localStorage.getItem(CONTACTOS_KEY);

  // Si no hay nada guardado, devolvemos un array vacío
  if (!contactosString) {
    return [];
  }

  try {
    // Intentamos convertir el string JSON a array
    const contactos = JSON.parse(contactosString);

    // Si no es un array, devolvemos array vacío por seguridad
    if (!Array.isArray(contactos)) {
      return [];
    }

    return contactos;
  } catch (error) {
    console.error('Error al leer contactos de localStorage:', error);
    return [];
  }
}

// -------------------------------
// Función: guardarContactosEnLocalStorage
// Recibe un array y lo guarda como JSON
// -------------------------------
function guardarContactosEnLocalStorage(contactos) {
  // Convertimos el array a string JSON
  const contactosString = JSON.stringify(contactos);

  // Lo guardamos bajo la clave CONTACTOS_KEY
  localStorage.setItem(CONTACTOS_KEY, contactosString);
}

// -------------------------------
// Función: renderizarContactos
// Dibuja los <li> dentro de la <ul> en el HTML
// -------------------------------
function renderizarContactos(listaElement, contactos) {
  // Limpiamos la lista primero
  listaElement.innerHTML = '';

  // Si no hay contactos, mostramos un mensaje
  if (contactos.length === 0) {
    const liVacio = document.createElement('li');
    liVacio.className = 'list-group-item text-center';
    liVacio.style.background = 'rgba(255, 255, 255, 0.8)';
    liVacio.style.color = '#999';
    liVacio.style.fontStyle = 'italic';
    liVacio.textContent = '✨ No hay contactos guardados aún.';
    listaElement.appendChild(liVacio);
    return;
  }

  // Recorremos cada contacto y creamos un <li>
  contactos.forEach(function (contacto, index) {
    const li = document.createElement('li');
    li.className = 'list-group-item';

    // Aquí armamos el contenido que verás en la lista con diseño mejorado
    li.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <div class="contacto-nombre">👤 ${contacto.nombre}</div>
          <div class="contacto-email">📧 ${contacto.correo}</div>
          <div class="mt-2">
            <span class="contacto-tipo">💳 ${contacto.tipoTarjeta}</span>
            <span class="contacto-cuenta">${contacto.numeroCuenta}</span>
          </div>
        </div>
        <button class="btn-eliminar-contacto" onclick="eliminarContacto(${index})">
          🗑️ Eliminar
        </button>
      </div>
    `;

    listaElement.appendChild(li);
  });
}

// -------------------------------
// Función: limpiarFormularioContacto
// Deja los campos del modal en blanco
// -------------------------------
function limpiarFormularioContacto() {
  document.getElementById('correoContacto').value = '';
  document.getElementById('nombreContacto').value = '';
  document.getElementById('tipoTarjeta').value = 'Tipo de tarjeta'; // opción por defecto
  document.getElementById('numeroCuenta').value = '';
}

// -------------------------------
// Función: eliminarContacto
// Elimina un contacto por su índice
// -------------------------------
function eliminarContacto(index) {
  if (confirm('¿Estás seguro de eliminar este contacto?')) {
    // Eliminar del array
    datoscontactos.splice(index, 1);
    
    // Guardar en localStorage
    guardarContactosEnLocalStorage(datoscontactos);
    
    // Volver a renderizar
    const listaContactos = document.getElementById('listaContactos');
    renderizarContactos(listaContactos, datoscontactos);
  }
}

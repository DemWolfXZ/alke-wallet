// Ejecutar cuando el DOM esté listo
$(document).ready(function() {
  // Cargar contactos guardados en localStorage
  var contactos = JSON.parse(localStorage.getItem('wallet_contactos')) || [];
  var contactoSeleccionado = null;

  // Renderizar lista de contactos en pantalla
  function mostrarContactos(lista) {
    $('#listaContactos').empty();
    
    if (lista.length === 0) {
      $('#listaContactos').append(
        '<li class="list-group-item text-center text-muted" style="font-style: italic;">' +
        '✨ No hay contactos guardados. Agrega contactos desde el menú principal.' +
        '</li>'
      );
      return;
    }
    
    lista.forEach(function(contacto, index) {
      // Mostrar los contactos con el formato del menú
      var tipoTarjeta = contacto.tipoTarjeta || 'N/A';
      var correo = contacto.correo || '';
      var numeroCuenta = contacto.numeroCuenta || 'N/A';
      
      $('#listaContactos').append(
        '<li class="list-group-item contacto-item" data-index="' + index + '" style="cursor: pointer;">' +
        '<div class="contacto-nombre" style="font-weight: bold; color: #667eea; margin-bottom: 5px;">👤 ' + contacto.nombre + '</div>' +
        '<div class="contacto-email" style="font-size: 0.9rem; color: #666; margin-bottom: 5px;">📧 ' + correo + '</div>' +
        '<div>' +
        '<span class="contacto-tipo" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; margin-right: 10px;">Tipo de tarjeta:  ' + tipoTarjeta + '</span>' +
        '<span class="contacto-cuenta" style="font-family: Courier New, monospace; color: #555; font-size: 0.9rem;"> <br> Numero de cuenta: '  + numeroCuenta + '</span>' +
        '</div>' +
        '</li>'
      );
    });
  }

  // Mostrar contactos al cargar la página
  mostrarContactos(contactos);

  // Mostrar formulario al hacer click en agregar contacto
  $('#btnAgregarContacto').click(function() {
    $('#formNuevoContacto').show();
  });

  // Ocultar formulario al cancelar
  $('#btnCancelar').click(function() {
    $('#formNuevoContacto').hide();
    $('#nuevoContactoForm')[0].reset();
  });

  $('#nuevoContactoForm').submit(function(event) {
    event.preventDefault();
    
    var nombre = $('#nombre').val();
    var alias = $('#alias').val();
    var cbu = $('#cbu').val();
    
    if (cbu.length === 22 && /^\d+$/.test(cbu)) {
      // Crear contacto con el mismo formato que en menu.html
      var nuevoContacto = {
        nombre: nombre,
        correo: alias + '@mail.com', // Usar alias como base de correo
        tipoTarjeta: 'Genérica',
        numeroCuenta: cbu
      };
      
      contactos.push(nuevoContacto);
      localStorage.setItem('wallet_contactos', JSON.stringify(contactos));
      mostrarContactos(contactos);
      $('#formNuevoContacto').hide();
      $('#nuevoContactoForm')[0].reset();
      $('#alert-container').html(
        '<div class="alert alert-success">Contacto agregado exitosamente</div>'
      );
    }
  });

  $('#buscarForm').submit(function(event) {
    event.preventDefault();
    
    var termino = $('#buscar').val().toLowerCase();
    var resultados = contactos.filter(function(contacto) {
      return contacto.nombre.toLowerCase().includes(termino) || 
             (contacto.correo && contacto.correo.toLowerCase().includes(termino)) ||
             (contacto.numeroCuenta && contacto.numeroCuenta.includes(termino));
    });
    mostrarContactos(resultados);
  });

  $(document).on('click', '.contacto-item', function() {
    $('.contacto-item').removeClass('active');
    $(this).addClass('active');
    contactoSeleccionado = $(this).data('index');
    $('#btnEnviarDinero').show();
  });

  $('#btnEnviarDinero').click(function() {
    if (contactoSeleccionado !== null) {
      var saldo = parseFloat(localStorage.getItem('saldo')) || 0;
      var monto = prompt('Ingrese el monto a enviar:');
      
      if (monto && parseFloat(monto) > 0 && parseFloat(monto) <= saldo) {
        saldo -= parseFloat(monto);
        localStorage.setItem('saldo', saldo);
        
        var transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
        transacciones.push({
          tipo: 'transferencia',
          monto: parseFloat(monto),
          destinatario: contactos[contactoSeleccionado].nombre,
          fecha: new Date().toLocaleDateString()
        });
        localStorage.setItem('transacciones', JSON.stringify(transacciones));
        
        $('#mensajeConfirmacion').html(
          '<div class="alert alert-success">Envío realizado con éxito a ' + 
          contactos[contactoSeleccionado].nombre + ' por $' + parseFloat(monto).toFixed(2) + '</div>'
        );
      } else {
        $('#alert-container').html(
          '<div class="alert alert-danger">Monto inválido o saldo insuficiente</div>'
        );
      }
    }
  });
});

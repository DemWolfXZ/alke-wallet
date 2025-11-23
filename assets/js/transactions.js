$(document).ready(function() {
  var listaTransacciones = JSON.parse(localStorage.getItem('transacciones')) || [
    { tipo: 'deposito', monto: 1000, fecha: '15/11/2025' },
    { tipo: 'compra', monto: 50, fecha: '16/11/2025', descripcion: 'Supermercado' },
    { tipo: 'transferencia', monto: 200, fecha: '17/11/2025', destinatario: 'Juan Pérez' }
  ];

  function getTipoTransaccion(tipo) {
    switch(tipo) {
      case 'deposito': return 'Depósito';
      case 'transferencia': return 'Transferencia';
      case 'compra': return 'Compra';
      default: return tipo;
    }
  }

  function mostrarUltimosMovimientos(filtro) {
    $('#listaMovimientos').empty();
    
    var movimientosFiltrados = listaTransacciones;
    if (filtro !== 'todos') {
      movimientosFiltrados = listaTransacciones.filter(function(transaccion) {
        return transaccion.tipo === filtro;
      });
    }

    if (movimientosFiltrados.length === 0) {
      $('#listaMovimientos').append(
        '<li class="list-group-item">No hay movimientos para mostrar</li>'
      );
    } else {
      movimientosFiltrados.forEach(function(transaccion) {
        var descripcion = getTipoTransaccion(transaccion.tipo);
        if (transaccion.destinatario) {
          descripcion += ' a ' + transaccion.destinatario;
        }
        if (transaccion.descripcion) {
          descripcion += ' - ' + transaccion.descripcion;
        }
        
        $('#listaMovimientos').append(
          '<li class="list-group-item">' +
          '<strong>' + descripcion + '</strong><br>' +
          'Monto: $' + transaccion.monto.toFixed(2) + '<br>' +
          'Fecha: ' + transaccion.fecha +
          '</li>'
        );
      });
    }
  }

  mostrarUltimosMovimientos('todos');

  $('#filtroTipo').change(function() {
    var filtro = $(this).val();
    mostrarUltimosMovimientos(filtro);
  });
});

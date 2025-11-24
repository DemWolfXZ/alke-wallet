// Ejecutar cuando el documento esté listo
$(document).ready(function() {
  // Cargar saldo desde localStorage
  var saldo = parseFloat(localStorage.getItem('saldo')) || 0;
  $('#saldoActual').text(saldo.toFixed(2));

  // Manejar el envío del formulario
  $('#depositForm').submit(function(event) {
    event.preventDefault();
    
    // Obtener el monto ingresado
    var monto = parseFloat($('#monto').val());
    
    // Validar que el monto sea positivo
    if (monto > 0) {
      // Sumar el depósito al saldo
      saldo += monto;
      localStorage.setItem('saldo', saldo);
      
      // Actualizar saldo en pantalla
      $('#saldoActual').text(saldo.toFixed(2));
      $('#montoDepositado').html(
        '<p class="text-success">Monto depositado: $' + monto.toFixed(2) + '</p>'
      );
      
      // Mostrar mensaje de éxito
      $('#alert-container').html(
        '<div class="alert alert-success">Depósito realizado con éxito</div>'
      );
      
      // Guardar transacción en el historial
      var transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
      transacciones.push({
        tipo: 'deposito',
        monto: monto,
        fecha: new Date().toLocaleDateString()
      });
      localStorage.setItem('transacciones', JSON.stringify(transacciones));
      
      // Redirigir al menú después de 2 segundos
      setTimeout(function() {
        window.location.href = 'menu.html';
      }, 2000);
    }
  });
});

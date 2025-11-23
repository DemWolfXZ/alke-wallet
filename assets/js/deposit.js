$(document).ready(function() {
  var saldo = parseFloat(localStorage.getItem('saldo')) || 0;
  $('#saldoActual').text(saldo.toFixed(2));

  $('#depositForm').submit(function(event) {
    event.preventDefault();
    
    var monto = parseFloat($('#monto').val());
    
    if (monto > 0) {
      saldo += monto;
      localStorage.setItem('saldo', saldo);
      
      $('#saldoActual').text(saldo.toFixed(2));
      $('#montoDepositado').html(
        '<p class="text-success">Monto depositado: $' + monto.toFixed(2) + '</p>'
      );
      
      $('#alert-container').html(
        '<div class="alert alert-success">Depósito realizado con éxito</div>'
      );
      
      var transacciones = JSON.parse(localStorage.getItem('transacciones')) || [];
      transacciones.push({
        tipo: 'deposito',
        monto: monto,
        fecha: new Date().toLocaleDateString()
      });
      localStorage.setItem('transacciones', JSON.stringify(transacciones));
      
      setTimeout(function() {
        window.location.href = 'menu.html';
      }, 2000);
    }
  });
});

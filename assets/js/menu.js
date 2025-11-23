$(document).ready(function() {
  var saldo = localStorage.getItem('saldo') || 0;
  $('#saldo').text(parseFloat(saldo).toFixed(2));

  $('#btnDepositar').click(function() {
    $('#alert-container').html(
      '<div class="alert alert-info">Redirigiendo a Depositar</div>'
    );
    setTimeout(function() {
      window.location.href = 'deposit.html';
    }, 1000);
  });

  $('#btnEnviarDinero').click(function() {
    $('#alert-container').html(
      '<div class="alert alert-info">Redirigiendo a Enviar Dinero</div>'
    );
    setTimeout(function() {
      window.location.href = 'sendmoney.html';
    }, 1000);
  });

  $('#btnUltimosMovimientos').click(function() {
    $('#alert-container').html(
      '<div class="alert alert-info">Redirigiendo a Últimos Movimientos</div>'
    );
    setTimeout(function() {
      window.location.href = 'transactions.html';
    }, 1000);
  });
});

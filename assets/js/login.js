$(document).ready(function() {
  $('#loginForm').submit(function(event) {
    event.preventDefault();
    var username = $('#email').val();
    var password = $('#password').val();

    // Verificar las credenciales
    if (username === 'admin@admin.cl' && password === '123456') {
      // Credenciales válidas, redirigir a la pantalla de wallet
      window.location.href = 'menu.html';
    } else {
      // Credenciales inválidas, mostrar mensaje de error
      alert('Usuario o contraseña invalido. Inténtalo de nuevo.');
    }
  });

});


// Marcador de funcionalidad de login
console.log('Login funcionando en feature/login');
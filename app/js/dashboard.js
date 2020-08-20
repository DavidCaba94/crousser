$(document).ready(function(){
	var usuario = localStorage.getItem('userObject');

	if(JSON.parse(usuario) == null) {
		window.location.href = 'https://crousser.com/app/login';
    }

	$('#btn-cerrar-sesion').on('click', function() {
		localStorage.setItem('userObject', null);
		localStorage.setItem('checkRecordar', "null");
		window.location.href = 'https://crousser.com/app/login';
	});
});

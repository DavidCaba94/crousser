var email, password;

$(document).ready(function(){
	$('#btn-entrar').on('click', function() {
		var relleno = true;

		//email
		if(estaVacío($("#email"))){
			relleno = false;
		} else {
			email = $("#email").val();
		}

		//password
		if(estaVacío($("#password"))){
			relleno = false;
		} else {
			password = $("#password").val();
		}

		if(relleno) {
			comprobarLogin();
		}
	});
});

function comprobarLogin() {
	$("#btn-entrar").css("display", "none");
	$("#loading-reg").css("display", "block");

	$.ajax({
      url: '../app/rest/obtener_usuario.php',
      dataType: 'json',
      data: ({email: email, password: password}),
      success: function(data) {
          if(data.mensaje != "KO"){
			  $(".texto-error").css("display", "none");
			  window.location.href = 'https://crousser.com/app/dashboard';
          } else {
			  $("#loading-reg").css("display", "none");
			  $("#btn-entrar").css("display", "block");
			  $(".texto-error").css("display", "block");
          }
      },
      error: function(error) {
          console.log(error);
      }
    });
}

function estaVacío(elemento) {
	var vacio = true;

	if(elemento.val() == ""){
		elemento.css("background-color", "#ffd9d9");
	} else {
		elemento.css("background-color", "#ffffff");
		vacio = false;
	}

	return vacio;
}

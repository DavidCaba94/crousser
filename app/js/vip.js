var usuario;

$(document).ready(function(){
	usuario = localStorage.getItem('userObject');

	if(JSON.parse(usuario) == null) {
		window.location.href = 'https://crousser.com/app/login';
    } else {
		usuario = JSON.parse(usuario);
		$("#nav-nombre").text(usuario.nombre);
		$("#nav-apellidos").text(usuario.apellidos);
		if(usuario.foto != null){
			$("#img-usuario").attr("src", usuario.foto);
			$("#img-usuario-nav").attr("src", usuario.foto);
		}
		if(usuario.vip == 1){
			$(".marco-imagen").css("background-color", "#ffcf00");
			$(".marco-imagen-nav").css("background-color", "#ffcf00");
			$(".ya-es-vip").css("display", "block");
		} else {
			$(".no-es-vip").css("display", "block");
		}
	}

	$('#btn-cerrar-sesion').on('click', function() {
		localStorage.setItem('userObject', null);
		localStorage.setItem('checkRecordar', null);
		window.location.href = 'https://crousser.com/app/login';
	});

	$('#btn-cerrar-sesion-nav').on('click', function() {
		localStorage.setItem('userObject', null);
		localStorage.setItem('checkRecordar', null);
		window.location.href = 'https://crousser.com/app/login';
	});

	$('#img-toggle').on('click', function() {
		$('#navigation-menu').animate({width: 'toggle'});
	});

	paypal.Buttons({
	    createOrder: function(data, actions) {
	      return actions.order.create({
	        purchase_units: [{
	          amount: {
	            value: '9.99',
				currency: 'EUR'
	          }
	        }]
	      });
	    },
	    onApprove: function(data, actions) {
	      // This function captures the funds from the transaction.
	      return actions.order.capture().then(function(details) {
			  convertirVIP();
	      });
	    }
	  }).render('#paypal-button-container');

});

function convertirVIP() {
	$.ajax({
      url: '../app/rest/convertir_vip.php',
      dataType: 'json',
      data: ({id: usuario.id}),
      success: function(data) {
          if(data.mensaje != "KO"){
			  $.ajax({
		        url: '../app/rest/obtener_usuario.php',
		        dataType: 'json',
		        data: ({email: usuario.email, password: usuario.password}),
		        success: function(data) {
		            if(data.mensaje != "KO"){
		  			  localStorage.setItem('userObject', JSON.stringify(data.users[0]));
		  			  window.location.href = 'https://crousser.com/app/vip';
		            } else {
		  			  alert("Algo salió mal, vuelva al inicio");
		            }
		        },
		        error: function(error) {
		            console.log(error);
		        }
		      });
          } else {
			  alert("Algo salió mal, vuelva al inicio");
          }
      },
      error: function(error) {
          console.log(error);
      }
    });
}

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

	cargarUsuariosDestacados();
});


function cargarUsuariosDestacados() {
	$.ajax({
		url: '../app/rest/obtener_all_users.php',
		dataType: 'json',
		success: function(data) {
			if(data.mensaje != "KO"){
				$("#loading-destacados").css("display", "none");
				$(".box-destacados").append('<div class="owl-carousel owl-carousel-destacados owl-theme"><div>');
				for(var i=0; i<data.users.length; i++) {
					$(".owl-carousel-destacados").append(''+
						'<div class="item">'+
							'<div class="usuario-destacado">'+
								'<div class="marco-destacado-'+ data.users[i].vip +'">'+
									'<img class="img-destacado" src="'+ data.users[i].foto +'">'+
								'</div>'+
								'<p class="nombre-destacado">'+ data.users[i].nombre +' '+ data.users[i].apellidos +'</p>'+
							'</div>'+
						'</div>');
				}
				$('.owl-carousel-destacados').owlCarousel({
					loop: false,
					margin: 10,
					stagePadding: 10,
					autoWidth: true
				});
			} else {
				alert("KO")
			}
		},
		error: function(error) {
			console.log(error);
		}
	  });
}
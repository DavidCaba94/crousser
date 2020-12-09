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

	$('#btn-buscar').on('click', function(){
		if($('#nombre').val() != "") {
			buscarUsuario($('#nombre').val());
		}
	});

	cargarUsuariosDestacados();
	cargarContactos();
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
				console.log("Error");
			}
		},
		error: function(error) {
			console.log(error);
		}
	  });
}

function buscarUsuario(nombre){
	$(".resultados").html('<div id="loading-resultados" class="lds-ring-resultados"><div></div><div></div><div></div><div></div></div>');
	$.ajax({
		url: '../app/rest/obtener_usuario_name.php',
		dataType: 'json',
		data: ({param: nombre}),
		success: function(data) {
			if(data.mensaje != "KO"){
				$(".resultados").html("");
				for(var i=0; i<data.users.length; i++) {
					$(".resultados").append(''+
						'<div class="item-resultado">'+
							'<div class="marco-resultado-'+ data.users[i].vip +'">'+
								'<img class="img-destacado" src="'+ data.users[i].foto +'">'+
							'</div>'+
							'<p class="nombre-resultado">'+ data.users[i].nombre +' '+ data.users[i].apellidos +'</p>'+
						'</div>');
				}
			} else {
				$(".resultados").html("");
				$(".resultados").append('<div class="sin-resultados">No se han encontrado usuarios<div>');
			}
		},
		error: function(error) {
			console.log(error);
		}
	  });
}

function cargarContactos() {
	$.ajax({
		url: '../app/rest/obtener_all_contactos.php',
		dataType: 'json',
		data: ({id_usuario: usuario.id}),
		success: function(data) {
			if(data.mensaje != "KO"){
				mostrarContactos(data.contactos);
				$(".titulo-contactos").text("Tus contactos ("+ data.contactos.length +")");
			} else {
				console.log("Error");
			}
		},
		error: function(error) {
			console.log(error);
		}
	  });
}

function mostrarContactos(contactos) {
	for(var i = 0; i < contactos.length; i++) {
		$.ajax({
			url: '../app/rest/obtener_usuario_id.php',
			dataType: 'json',
			data: ({id: parseInt(contactos[i].id_contacto)}),
			success: function(data) {
				if(data.mensaje != "KO"){
					$(".listado-contactos").append(''+
						'<div class="item-contacto">'+
							'<div class="marco-contacto-'+ data.users[0].vip +'">'+
								'<img class="img-contacto" src="'+ data.users[0].foto +'">'+
							'</div>'+
							'<p class="nombre-contacto">'+ data.users[0].nombre +' '+ data.users[0].apellidos +'</p>'+
						'</div>');
				} else {
					console.log("Error");
				}
			},
			error: function(error) {
				console.log(error);
			}
		  });
	}
}
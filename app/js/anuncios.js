var usuario;
var listaAnuncios = [];
var id_usuario, titulo, descripcion, tipo, foto, fecha_creacion, premium;

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

	$('#btn-guardar').on('click', function() {
		comprobarCampos();
    });

	$("#foto").change(function(){
		if(this.files[0].size > 1024000){
			alert("La foto no puede pesar mas de 1MB");
			this.value = "";
		} else {
			$("#label-foto").text($("#foto").val());
		}
	});

	$("#edit-foto").change(function(){
		if(this.files[0].size > 1024000){
			alert("La foto no puede pesar mas de 1MB");
			this.value = "";
		} else {
			$("#label-foto-edit").text($("#edit-foto").val());
		}
	});

	$("#foto-producto").change(function(){
		if(this.files[0].size > 1024000){
			alert("La foto no puede pesar mas de 1MB");
			this.value = "";
		} else {
			$("#label-foto-producto").text($("#foto-producto").val());
		}
	});

	$('#exampleModalCenterAnuncioEdit').on('hidden.bs.modal', function (e) {
		$("#btn-eliminar-anuncio").css("display","block");
		$(".texto-confirmar-eliminar").css("display","none");
		$(".box-confirmar-eliminar").css("display","none");
	});

    cargarAnuncios(usuario.id);
	$("#tipo").val(usuario.rol);
    
});

function cargarAnuncios(id) {
	listaAnuncios = [];
    $.ajax({
		url: '../app/rest/obtener_anuncios_user_id.php',
		dataType: 'json',
		data: ({id: id}),
		success: function(data) {
			if(data.mensaje != "KO"){
				$(".contenedor-anuncios").html("");
				for(var i=0; i<data.anuncios.length; i++) {
					listaAnuncios[i] = data.anuncios[i];
					$(".contenedor-anuncios").append(''+
						'<div class="box-anuncio" onclick="cargarDetalleAnuncio('+ i +')">'+
							'<div id="imagen-anuncio-'+ i +'" class="imagen-anuncio">'+
								'<div class="tag-premium-'+ data.anuncios[i].premium +'">PREMIUM</div>'+
							'</div>'+
							'<div class="contenido-anuncio">'+
								'<p class="titulo-box-anuncio">'+ data.anuncios[i].titulo +'</p>'+
								'<p class="descripcion-box-anuncio">'+ data.anuncios[i].descripcion +'</p>'+
							'</div>'+
						'</div>');
				}
				$(".contenedor-anuncios").append(''+
					'<div class="box-nuevo-anuncio" data-toggle="modal" data-target="#exampleModalCenterAnuncio">+</div>'+
				'</div>');
				setImagenes();
			} else {
				$(".contenedor-anuncios").html("");
				$(".contenedor-anuncios").append(''+
					'<div class="box-nuevo-anuncio" data-toggle="modal" data-target="#exampleModalCenterAnuncio">+</div>'+
				'</div>');
			}
		},
		error: function(error) {
			console.log(error);
		}
	  });
}

function comprobarCampos() {
	var todoRelleno = true;

	if(estaVacío($("#titulo"))){
		todoRelleno = false;
	} else {
		titulo = $("#titulo").val();
	}

	if(estaVacío($("#descripcion"))){
		todoRelleno = false;
	} else {
		titulo = $("#descripcion").val();
	}

	if(todoRelleno) {
		guardarAnuncio();
	}
}

async function guardarAnuncio() {
	const file = document.querySelector('#foto').files[0];
	if(file != null) {
		foto = await toBase64(file);
	}

	id_usuario = usuario.id;
	titulo = $("#titulo").val();
	descripcion = $("#descripcion").val();
	tipo = usuario.rol;
	fecha_creacion = new Date().toJSON().slice(0, 10);

	if($('#premium').prop('checked')) {
		premium = 1;
	} else  {
		premium = 0;
	}

	$.ajax({
		type: 'POST',
		url: '../app/rest/insertar_anuncio.php',
		dataType: 'json',
		data: ({
			id_usuario: id_usuario,
			titulo: titulo,
			descripcion: descripcion,
			tipo: tipo,
			foto: foto,
			fecha_creacion: fecha_creacion,
			premium: premium
		}),
		success: function(data) {
			$("#titulo").val("");
			$("#descripcion").val("");
			foto = null;
			cerrarPopup();
			$(".contenedor-anuncios").append(''+
				'<div id="loading-destacados" class="lds-ring-destacados"><div></div><div></div><div></div><div></div></div>'+
			'</div>');
			cargarAnuncios(usuario.id);
		},
		error: function(error) {
			alert("Algo ha salido mal");
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

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function cerrarPopup() {
	$("#exampleModalCenterAnuncio").modal('hide');
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();
}

function setImagenes() {
	for(var i=0; i<listaAnuncios.length; i++) {
		if(listaAnuncios[i].foto != null){
			$("#imagen-anuncio-"+i).css('background-image', 'url(' + listaAnuncios[i].foto + ')');
			$("#imagen-anuncio-"+i).css('background-repeat', 'no-repeat');
			$("#imagen-anuncio-"+i).css('background-position', 'center');
			$("#imagen-anuncio-"+i).css('background-size', 'cover');
		}
	}
}

function cargarDetalleAnuncio(idAnuncio){
	$("#exampleModalCenterAnuncioEdit").modal("show");
	$("#titulo-edicion").text(listaAnuncios[idAnuncio].titulo);
	$("#edit-titulo").val(listaAnuncios[idAnuncio].titulo);
	$("#edit-descripcion").val(listaAnuncios[idAnuncio].descripcion);
	$("#edit-tipo").val(listaAnuncios[idAnuncio].tipo);
	$("#edit-foto").val(null);
	$("#label-foto-edit").text("Foto (1MB máx.)");
	if(listaAnuncios[idAnuncio].premium == 1){
		$('#edit-premium').prop('checked', true);
	} else {
		$('#edit-premium').prop('checked', false);
	}
	cargarProductos(listaAnuncios[idAnuncio].id);
	$("#btn-guardar-edit").attr("onclick", "guardarEdicion("+ idAnuncio +")");
	$("#btn-eliminar-anuncio").attr("onclick", "confirmarEliminacion("+ listaAnuncios[idAnuncio].id +")");
}

function confirmarEliminacion(id) {
	$("#btn-eliminar-anuncio").css("display","none");
	$(".texto-confirmar-eliminar").css("display","block");
	$(".box-confirmar-eliminar").css("display","flex");

	$('#btn-confirmar-eliminar').on('click', function() {
		eliminarAnuncio(id);
    });
	
	$('#btn-confirmar-cancelar').on('click', function() {
		$("#btn-eliminar-anuncio").css("display","block");
		$(".texto-confirmar-eliminar").css("display","none");
		$(".box-confirmar-eliminar").css("display","none");
    });
}

function eliminarAnuncio(id) {
	$.ajax({
		type: 'POST',
		url: '../app/rest/eliminar_anuncio.php',
		dataType: 'json',
		data: ({id: id}),
		success: function(data) {
			if(data.mensaje != "KO"){
				$("#btn-eliminar-anuncio").css("display","block");
				$(".texto-confirmar-eliminar").css("display","none");
				$(".box-confirmar-eliminar").css("display","none");
				cerrarPopupEdicion();
				cargarAnuncios(usuario.id);
				eliminarProductosRelacionados(id);
			} else {
				alert("No se ha podido eliminar el anuncio");
				$("#btn-eliminar-anuncio").css("display","block");
				$(".texto-confirmar-eliminar").css("display","none");
				$(".box-confirmar-eliminar").css("display","none");
			}
		},
		error: function(error) {
			console.log(error);
		}
	});
}

function eliminarProductosRelacionados(id_anuncio) {
	$.ajax({
		type: 'POST',
		url: '../app/rest/eliminar_productos_anuncio.php',
		dataType: 'json',
		data: ({id_anuncio: id_anuncio}),
		success: function(data) {
			if(data.mensaje != "KO"){
				
			} else {
				
			}
		},
		error: function(error) {
			console.log(error);
		}
	});
}

function cerrarPopupEdicion() {
	$("#exampleModalCenterAnuncioEdit").modal('hide');
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();
}

async function guardarEdicion(idAnuncio) {
	const file = document.querySelector('#edit-foto').files[0];
	if(file != null) {
		newFoto = await toBase64(file);
	} else {
		newFoto = listaAnuncios[idAnuncio].foto;
	}

	titulo = $("#edit-titulo").val();
	descripcion = $("#edit-descripcion").val();

	if($('#edit-premium').prop('checked')) {
		premium = 1;
	} else  {
		premium = 0;
	}

	$.ajax({
		type: 'POST',
		url: '../app/rest/actualizar_anuncio.php',
		dataType: 'json',
		data: ({
			id: listaAnuncios[idAnuncio].id,
			titulo: titulo,
			descripcion: descripcion,
			foto: newFoto,
			premium: premium
		}),
		success: function(data) {
			newFoto = null;
			cerrarPopupEdicion();
			$(".contenedor-anuncios").append(''+
				'<div id="loading-destacados" class="lds-ring-destacados"><div></div><div></div><div></div><div></div></div>'+
			'</div>');
			cargarAnuncios(usuario.id);
		},
		error: function(error) {
			alert("Algo ha salido mal");
			console.log(error);
		}
  	});
}

function cargarProductos(idAnuncio) {
	$.ajax({
		url: '../app/rest/obtener_productos_anuncio.php',
		dataType: 'json',
		data: ({idAnuncio: idAnuncio}),
		success: function(data) {
			if(data.mensaje != "KO"){
				console.log(data);
				$(".box-productos").html("");
				for(var i=0; i<data.productos.length; i++) {
					$(".box-productos").append(''+
						'<div class="box-nuevo-producto">'+ data.productos[i].nombre +'</div>'+
					'</div>');
				}
				$(".box-productos").append(''+
					'<div class="box-nuevo-producto" onclick="abrirModalNuevoProducto('+ idAnuncio +')">+</div>'+
				'</div>');
				//setImagenesProductos();
			} else {
				console.log(data);
				$(".box-productos").html("");
				$(".box-productos").append(''+
					'<div class="box-nuevo-producto" onclick="abrirModalNuevoProducto('+ idAnuncio +')">+</div>'+
				'</div>');
			}
		},
		error: function(error) {
			console.log(error);
		}
	  });
}

function abrirModalNuevoProducto(idAnuncio) {
	cerrarPopupEdicion();
	$("#exampleModalCenterProducto").modal('show');
	$("#btn-guardar-producto").attr("onclick", "comprobarCamposProducto("+ idAnuncio +")");
}

function comprobarCamposProducto(idAnuncio) {
	var todoRelleno = true;

	if(estaVacío($("#nombre-producto"))){
		todoRelleno = false;
	}

	if(estaVacío($("#descripcion-producto"))){
		todoRelleno = false;
	}

	if(estaVacío($("#precio-producto"))){
		todoRelleno = false;
	}

	if(todoRelleno) {
		guardarNuevoProducto(idAnuncio);
	}
}

async function guardarNuevoProducto(id_anuncio) {
	const file = document.querySelector('#foto-producto').files[0];
	if(file != null) {
		foto = await toBase64(file);
	}

	nombre = $("#nombre-producto").val();
	descripcion = $("#descripcion-producto").val();
	precio = $("#precio-producto").val();

	$.ajax({
		type: 'POST',
		url: '../app/rest/insertar_producto.php',
		dataType: 'json',
		data: ({
			id_anuncio: id_anuncio,
			nombre: nombre,
			descripcion: descripcion,
			precio: precio,
			foto: foto
		}),
		success: function(data) {
			$("#nombre-producto").val("");
			$("#descripcion-producto").val("");
			$("#precio-producto").val("");
			$("#label-foto-producto").text("Foto (1MB máx.)");
			foto = null;
			cerrarPopupProducto();
		},
		error: function(error) {
			alert("Algo ha salido mal");
			console.log(error);
		}
  	});
}

function cerrarPopupProducto() {
	$("#exampleModalCenterProducto").modal('hide');
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();
}
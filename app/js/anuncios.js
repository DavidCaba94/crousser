var usuario;
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

    cargarAnuncios(usuario.id);
	$("#tipo").val(usuario.rol);
    
});

function cargarAnuncios(id) {
    
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
			alert("Anuncio guardado");
			$("#titulo").val("");
			$("#descripcion").val("");
			foto = null;
			$("#btn-guardar").css("display", "none");
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
//Obligatorios
var email, nombre, apellidos, password, password2, fecha_nac, pais, ciudad, email_contacto, rol = "webmaster";
//Opcionales
var foto, website, instagram, linkedin, telefono, descripcion;


$(document).ready(function(){

	cargarPaisesForm();

	$('#btn-siguiente').on('click', function() {
		avanzarPaso();
	});

	$('#pais').change(function(){
	    cargarEstadosForm($(this).val());
	});

	$("input[name=rol]").click(function () {
        rol = $(this).val();
    });

	$('.box-volver').on('click', function() {
		$(".box-registro2").css("display", "none");
		$(".box-registro").css("display", "block");
	});

	$("#btn-registrar").on('click', function() {
		guardarRegistro();
	});
});

function cargarPaisesForm() {
	$.ajax({
	    type: 'GET',
	    url: '../app/rest/obtener_paises.php',
	    dataType: 'json',
	    success: function(data) {
			$("#pais").append('<option value="">Seleccione una opción</option>');
			for(var i=0; i<data.paises.length; i++){
				$("#pais").append('<option value="'+data.paises[i].id+'">'+data.paises[i].paisnombre+'</option>');
			}
	    },
	    error: function(error) {
	        alert("Algo ha salido mal, vuelva a cargar la página");
	    }
	});
}

function cargarEstadosForm(idPais) {
	$.ajax({
		type: 'GET',
		url: '../app/rest/obtener_estados.php',
		dataType: 'json',
		data: ({paisId: parseInt(idPais)}),
		success: function(data) {
			$("#ciudad").html('<option value="">Seleccione una opción</option>');
			for(var i=0; i<data.estados.length; i++){
				$("#ciudad").append('<option value="'+data.estados[i].id+'">'+data.estados[i].estadonombre+'</option>');
			}
			$("#ciudad").prop("disabled", false);
		},
		error: function(error) {
			alert("Algo ha salido mal, vuelva a cargar la página");
		}
	});
}

function avanzarPaso() {
	var relleno = true;

	//email
	if(estaVacío($("#email"))){
		relleno = false;
	} else {
		email = $("#email").val();
	}

	//nombre
	if(estaVacío($("#nombre"))){
		relleno = false;
	} else {
		nombre = $("#nombre").val();
	}

	//apellidos
	if(estaVacío($("#apellidos"))){
		relleno = false;
	} else {
		apellidos = $("#apellidos").val();
	}

	//password
	if(estaVacío($("#password"))){
		relleno = false;
	} else {
		password = $("#password").val();
	}

	//password2
	if(estaVacío($("#password2"))){
		relleno = false;
	} else {
		password2 = $("#password2").val();
	}

	//fecha_nac
	if(estaVacío($("#fecha_nac"))){
		relleno = false;
	} else {
		fecha_nac = $("#fecha_nac").val();
	}

	//pais
	if(estaVacío($("#pais"))){
		relleno = false;
	} else {
		pais = $("#pais").val();
	}

	//ciudad
	if(estaVacío($("#ciudad"))){
		relleno = false;
	} else {
		ciudad = $("#ciudad").val();
	}

	//email_contacto
	if(estaVacío($("#email_contacto"))){
		relleno = false;
	} else {
		email_contacto = $("#email_contacto").val();
	}

	if(!relleno){
		$(".texto-error").css("display", "block");
	} else {
		$(".texto-error").css("display", "none");
		if(passwordIguales()){
			//avanzo paso
			$(".box-registro").css("display", "none");
			$(".box-registro2").css("display", "block");
		}
	}
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

function passwordIguales() {
	var iguales = false;

	if(password == password2) {
		iguales = true;
	} else {
		$("#password").css("background-color", "#ffd9d9");
		$("#password2").css("background-color", "#ffd9d9");
		$(".texto-error").text("Ambas contraseñas deben ser iguales");
		$(".texto-error").css("display", "block");
	}

	return iguales;
}

function guardarRegistro() {
	alert("En mantenimiento");
}

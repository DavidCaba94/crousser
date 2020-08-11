$(document).ready(function(){

	cargarPaisesForm();

	$('#btn-entrar').on('click', function() {

	});

	$('#pais').change(function(){
	    cargarEstadosForm($(this).val());
	});
});

function cargarPaisesForm() {
	$.ajax({
	    type: 'GET',
	    url: '../app/rest/obtener_paises.php',
	    dataType: 'json',
	    success: function(data) {
			$("#pais").append('<option value="nulo">Seleccione una opción</option>');
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
			$("#ciudad").html('<option value="nulo">Seleccione una opción</option>');
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

$(document).ready(function(){
    $("#tab-webmaster").on("click", function() {
        $("#tab-webmaster").addClass("activa");
        $("#tab-negocio").removeClass("activa");
    });

    $("#tab-negocio").on("click", function() {
        $("#tab-negocio").addClass("activa");
        $("#tab-webmaster").removeClass("activa");
    });
});

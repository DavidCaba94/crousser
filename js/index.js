$(document).ready(function(){
    $("#tab-webmaster").on("click", function() {
        $("#tab-webmaster").addClass("activa");
        $("#tab-negocio").removeClass("activa");
        $("#tips-webmaster").css("display", "block");
        $("#tips-negocio").css("display", "none");
    });

    $("#tab-negocio").on("click", function() {
        $("#tab-negocio").addClass("activa");
        $("#tab-webmaster").removeClass("activa");
        $("#tips-negocio").css("display", "block");
        $("#tips-webmaster").css("display", "none");
    });
});

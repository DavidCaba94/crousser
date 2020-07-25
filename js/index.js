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

    $(".pregunta").on("click", function() {
        if($(this).find('.flecha-desplegable').hasClass("desplegada")){
            rotarFlecha(this, 0);
            $(this).find('.flecha-desplegable').removeClass("desplegada");
        } else {
            rotarFlecha(this, -180);
            $(this).find('.flecha-desplegable').addClass("desplegada");
        }
        $(this).next().slideToggle();
    });
});

function rotarFlecha(flecha, direccion){
    $(flecha).find('.flecha-desplegable').animate(
        { deg: direccion },
        {
            duration: 500,
            step: function(now) {
                $(this).css({ transform: 'rotate(' + now + 'deg)' });
            }
        }
    );
}

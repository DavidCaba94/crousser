<?php
require 'Anuncios.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $id = $_GET['id'];
    $anuncios = Anuncios::getAllByUserId($id);
    if ($anuncios) {
        $datos["estado"] = "1";
        $datos["anuncios"] = $anuncios;
        print json_encode($datos);
    } else {
        print json_encode(array(
            "estado" => 2,
            "mensaje" => "KO"
        ));
    }
}

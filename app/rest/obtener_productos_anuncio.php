<?php
require 'Productos.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $idAnuncio = $_GET['idAnuncio'];
    $productos = Productos::getAllByAnuncioId($idAnuncio);
    if ($productos) {
        $datos["estado"] = "1";
        $datos["productos"] = $productos;
        print json_encode($datos);
    } else {
        print json_encode(array(
            "estado" => 2,
            "mensaje" => "KO"
        ));
    }
}

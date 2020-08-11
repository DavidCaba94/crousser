<?php
require 'Paises.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $paises = Paises::getAll();
    if ($paises) {
        $datos["estado"] = "1";
        $datos["paises"] = $paises;
        print json_encode($datos);
    } else {
        print json_encode(array(
            "estado" => 2,
            "mensaje" => "KO"
        ));
    }
}

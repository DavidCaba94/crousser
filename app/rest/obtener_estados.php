<?php
require 'Estados.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $paisId = $_GET['paisId'];
    $estados = Estados::getAll($paisId);
    if ($estados) {
        $datos["estado"] = "1";
        $datos["estados"] = $estados;
        print json_encode($datos);
    } else {
        print json_encode(array(
            "estado" => 2,
            "mensaje" => "KO"
        ));
    }
}

<?php
require 'Contactos.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $id_usuario = $_GET['id_usuario'];
    $contactos = Users::getAll($id_usuario);
    if ($contactos) {
        $datos["estado"] = "1";
        $datos["contactos"] = $contactos;
        print json_encode($datos);
    } else {
        print json_encode(array(
            "estado" => 2,
            "mensaje" => "KO"
        ));
    }
}

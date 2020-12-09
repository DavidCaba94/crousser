<?php
require 'Users.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $id = $_GET['id'];
    $users = Users::getAllById($id);
    if ($users) {
        $datos["estado"] = "1";
        $datos["users"] = $users;
        print json_encode($datos);
    } else {
        print json_encode(array(
            "estado" => 2,
            "mensaje" => "KO"
        ));
    }
}

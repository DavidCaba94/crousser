<?php
require 'Users.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $retorno = Users::updateVIP($id);
    if ($retorno) {
        $json_string = json_encode(array("estado" => 1,"mensaje" => "OK"));
		echo $json_string;
    } else {
        $json_string = json_encode(array("estado" => 2,"mensaje" => "KO"));
		echo $json_string;
    }
}
?>

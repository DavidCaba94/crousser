<?php
require 'Productos.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id_anuncio = $_POST['id_anuncio'];
    $retorno = Productos::deleteProductosAnuncio($id_anuncio);
    if ($retorno) {
        $json_string = json_encode(array("estado" => 1,"mensaje" => "Eliminacion exitosa"));
		echo $json_string;
    } else {
        $json_string = json_encode(array("estado" => 2,"mensaje" => "No se elimino el registro"));
		echo $json_string;
    }
}
?>
<?php
require 'Anuncios.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
    $foto = $_POST['foto'];
    $premium = $_POST['premium'];
    $retorno = Anuncios::actualizarAnuncio($id, $titulo, $descripcion, $foto, $premium);
    if ($retorno) {
        $json_string = json_encode(array("estado" => 1,"mensaje" => "OK"));
		echo $json_string;
    } else {
        $json_string = json_encode(array("estado" => 2,"mensaje" => "KO"));
		echo $json_string;
    }
}
?>

<?php
require 'Anuncios.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id_usuario = $_POST['id_usuario'];
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
    $tipo = $_POST['tipo'];
    $foto = $_POST['foto'];
    $fecha_creacion = $_POST['fecha_creacion'];
    $premium = $_POST['premium'];
    $body = json_decode(file_get_contents("php://input"), true);
    $retorno = Anuncios::insertarAnuncio($id_usuario, $titulo, $descripcion, $tipo, $foto, $fecha_creacion, $premium);
    if ($retorno) {
        $json_string = json_encode(array("estado" => 1,"mensaje" => "Creacion correcta"));
		echo $json_string;
    } else {
        $json_string = json_encode(array("estado" => 2,"mensaje" => "No se creo el registro"));
		echo $json_string;
    }
}
?>

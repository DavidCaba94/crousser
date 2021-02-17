<?php
require 'Productos.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id_anuncio = $_POST['id_anuncio'];
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];
    $foto = $_POST['foto'];
    $body = json_decode(file_get_contents("php://input"), true);
    $retorno = Productos::insertarProducto($id_anuncio, $nombre, $descripcion, $precio, $foto);
    if ($retorno) {
        $json_string = json_encode(array("estado" => 1,"mensaje" => "Creacion correcta"));
		echo $json_string;
    } else {
        $json_string = json_encode(array("estado" => 2,"mensaje" => "No se creo el registro"));
		echo $json_string;
    }
}
?>

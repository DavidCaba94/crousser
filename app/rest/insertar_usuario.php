<?php
require 'Users.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $password = $_POST['password'];
    $fecha_nac = $_POST['fecha_nac'];
    $fecha_reg = $_POST['fecha_reg'];
    $pais = $_POST['pais'];
    $ciudad = $_POST['ciudad'];
    $email_contacto = $_POST['email_contacto'];
    $rol = $_POST['rol'];
    $foto = $_POST['foto'];
    $website = $_POST['website'];
    $instagram = $_POST['instagram'];
    $linkedin = $_POST['linkedin'];
    $telefono = $_POST['telefono'];
    $descripcion = $_POST['descripcion'];
    $body = json_decode(file_get_contents("php://input"), true);
    $retorno = Users::insert($email,$nombre,$apellidos,md5($password),$fecha_nac,$fecha_reg,$pais,$ciudad,$email_contacto,$rol,$foto,$website,$instagram,$linkedin,$telefono,$descripcion);
    if ($retorno) {
        $json_string = json_encode(array("estado" => 1,"mensaje" => "Creacion correcta"));
		echo $json_string;
    } else {
        $json_string = json_encode(array("estado" => 2,"mensaje" => "No se creo el registro"));
		echo $json_string;
    }
}
?>

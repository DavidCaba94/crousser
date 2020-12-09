<?php
require 'Database.php';
class Users
{
    function __construct()
    {
    }
    public static function getAll($email,$pass){
        $consulta = "SELECT * FROM usuarios WHERE email = '$email' AND password = '$pass'";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getAllById($id){
        $consulta = "SELECT * FROM usuarios WHERE id = '$id'";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getAllUsers(){
        $consulta = "SELECT * FROM usuarios";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getUser($email){
        $consulta = "SELECT * FROM usuarios WHERE email = '$email'";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getUserByName($param){
        $consulta = "SELECT * FROM usuarios WHERE nombre LIKE '%$param%' OR apellidos LIKE '%$param%'";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getEmail($email){
        $consulta = "SELECT email FROM usuarios WHERE email = '$email'";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getUserLogin($email,$pass){
        $consulta = "SELECT id, nombre, apellidos, email, password FROM usuarios";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute(array($username));
            $row = $comando->fetch(PDO::FETCH_ASSOC);
            return $row;
        } catch (PDOException $e) {
            return -1;
        }
    }

    public static function update($username, $password, $name, $surname, $email, $foto){
        $consulta = "UPDATE user" .
            " SET password=?, name=?, surname=?, email=?, foto=? " .
            "WHERE username=?";
        $cmd = Database::getInstance()->getDb()->prepare($consulta);
        $cmd->execute(array($password, $name, $surname, $email, $foto, $username));
        return $cmd;
    }

    public static function updateVIP($id){
        $consulta = "UPDATE usuarios SET vip=1 WHERE id=?";
        $cmd = Database::getInstance()->getDb()->prepare($consulta);
        $cmd->execute(array($id));
        return $cmd;
    }

    public static function insert($email,$nombre,$apellidos,$password,$fecha_nac,$fecha_reg,$pais,$ciudad,$email_contacto,$rol,$foto,$website,$instagram,$linkedin,$telefono,$descripcion) {
        $comando = "INSERT INTO usuarios ( " .
                "email," .
      			"nombre," .
      			"apellidos," .
      			"password," .
      			"fecha_nac," .
      			"fecha_reg," .
      			"pais," .
      			"ciudad," .
      			"email_contacto," .
      			"rol," .
      			"foto," .
      			"website," .
      			"instagram," .
      			"linkedin," .
      			"telefono," .
      			"descripcion," .
                "vip)" .
            " VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(
            array($email,$nombre,$apellidos,$password,$fecha_nac,$fecha_reg,$pais,$ciudad,$email_contacto,$rol,$foto,$website,$instagram,$linkedin,$telefono,$descripcion)
        );
    }


    public static function delete($id){
        $comando = "DELETE FROM user WHERE id=?";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(array($id));
    }
}
?>

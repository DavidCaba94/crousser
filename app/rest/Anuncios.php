<?php
require 'Database.php';
class Anuncios
{
    function __construct()
    {
    }
    public static function getAll(){
        $consulta = "SELECT * FROM anuncios";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getAllByUserId($id){
        $consulta = "SELECT * FROM anuncios WHERE id_usuario = '$id'";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getAnuncio($id){
        $consulta = "SELECT * FROM anuncios WHERE id = '$id'";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function insertarAnuncio($id_usuario, $titulo, $descripcion, $tipo, $foto, $fecha_creacion, $premium) {
        $comando = "INSERT INTO anuncios ( " .
                "id_usuario," .
      			"titulo," .
      			"descripcion," .
      			"tipo," .
      			"foto," .
      			"fecha_creacion," .
      			"premium)" .
            " VALUES(?,?,?,?,?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(
            array($id_usuario, $titulo, $descripcion, $tipo, $foto, $fecha_creacion, $premium)
        );
    }

    public static function actualizarAnuncio($id, $titulo, $descripcion, $foto, $premium){
        $consulta = "UPDATE anuncios" .
            " SET titulo=?, descripcion=?, foto=?, premium=? " .
            "WHERE id=?";
        $cmd = Database::getInstance()->getDb()->prepare($consulta);
        $cmd->execute(array($titulo, $descripcion, $foto, $premium, $id));
        return $cmd;
    }

    public static function deleteAnuncio($id){
        $comando = "DELETE FROM anuncios WHERE id = ?";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(array($id));
    }
}
?>

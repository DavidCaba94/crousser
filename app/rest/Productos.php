<?php
require 'Database.php';
class Productos
{
    function __construct()
    {
    }
    public static function getAll(){
        $consulta = "SELECT * FROM productos";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getAllByAnuncioId($id_anuncio){
        $consulta = "SELECT * FROM productos WHERE id_anuncio = '$id_anuncio'";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getProducto($id){
        $consulta = "SELECT * FROM productos WHERE id = '$id'";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function insertarProducto($id_anuncio, $nombre, $descripcion, $precio, $foto) {
        $comando = "INSERT INTO productos ( " .
                "id_anuncio," .
      			"nombre," .
      			"descripcion," .
      			"precio," .
      			"foto)" .
            " VALUES(?,?,?,?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(
            array($id_anuncio, $nombre, $descripcion, $precio, $foto)
        );
    }

    public static function actualizarProducto($id, $nombre, $descripcion, $precio, $foto){
        $consulta = "UPDATE productos" .
            " SET nombre=?, descripcion=?, precio=?, foto=? " .
            "WHERE id=?";
        $cmd = Database::getInstance()->getDb()->prepare($consulta);
        $cmd->execute(array($nombre, $descripcion, $precio, $foto, $id));
        return $cmd;
    }

    public static function deleteProducto($id){
        $comando = "DELETE FROM productos WHERE id = ?";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(array($id));
    }

    public static function deleteProductosAnuncio($id_anuncio){
        $comando = "DELETE FROM productos WHERE id_anuncio = ?";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(array($id_anuncio));
    }
}
?>

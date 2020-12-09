<?php
require 'Database.php';
class Users
{
    function __construct()
    {
    }
    public static function getAll($id_usuario){
        $consulta = "SELECT id_contacto FROM contactos WHERE id_usuario = '$id_usuario'";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function insert($id_usuario,$id_contacto) {
        $comando = "INSERT INTO contactos ( " .
                "id_usuario," .
      			"id_contacto)" .
            " VALUES(?,?)";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(
            array($id_usuario,$id_contacto)
        );
    }


    public static function delete($id_usuario,$id_contacto){
        $comando = "DELETE FROM contacto WHERE id_usuario=? AND id_contacto=?";
        $sentencia = Database::getInstance()->getDb()->prepare($comando);
        return $sentencia->execute(array($id_usuario,$id_contacto));
    }
}
?>

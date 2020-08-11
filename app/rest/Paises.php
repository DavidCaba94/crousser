<?php
require 'Database.php';
class Paises
{
    function __construct()
    {
    }
    public static function getAll()
    {
        $consulta = "SELECT * FROM pais ORDER BY paisnombre ASC";
        try {
            $comando = Database::getInstance()->getDb()->prepare($consulta);
            $comando->execute();
            return $comando->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }
}
?>

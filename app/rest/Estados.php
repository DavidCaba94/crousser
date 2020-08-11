<?php
require 'Database.php';
class Estados
{
    function __construct()
    {
    }
    public static function getAll($paisId)
    {
        $consulta = "SELECT * FROM estado WHERE ubicacionpaisid = '$paisId' ORDER BY estadonombre ASC";
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

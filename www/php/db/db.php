<?php
/**
 * Created by PhpStorm.
 * User: surpa
 * Date: 8/22/2018
 * Time: 12:02 PM
 */

require_once 'DbError.php';
mysqli_report(MYSQLI_REPORT_STRICT);

class Connection{
    const PATH = '', USERNAME = '', PASSWORD = '', DATABASE = '';
    private $connection;

    public function __construct(){
        $this->connection = new msqli(self::PATH, self::USERNAME, self::PASSWORD, self::DATABASE);

        if(!$this->connection->set_charset('utf8')){
            printf("Errore nel carricare UTF8: %s\n", $this->connection->error);
        }
    }

    function __destruct(){
        $this->connection->close();
    }

    //TODO funzioni per interagire con il db
}
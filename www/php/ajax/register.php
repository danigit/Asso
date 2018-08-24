<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 11:54 AM
 */
require_once 'helper.php';
require_once 'is_not_logged.php';
class register extends is_not_logged {

    private $username, $password;

    protected function input_elaboration(){
        $this->username = $this->validate_string('registerUsername');
        if(!$this->username)
            $this->json_error("Inserire partita iva");

        $this->password = $this->validate_string('registerPassword');
        if(!$this->password)
            $this->json_error('Inserire una password');
    }

    protected function get_informations(){
        $passwd = password_hash($this->password, PASSWORD_DEFAULT);

        //TODO inserire la password nella cartella giusta, o cmq salvare la password da qualche parte
        //e fare in modo che se e gia' presente di non reinserirla
        $file = fopen('users.csv', 'a');
        fputcsv($file, array($this->username, $passwd));

        fclose($file);
        //TODO ritorna errore se non riesci a salvare la pasword
    }

    protected function get_returned_data(){
        return array();
    }
}

$register = new register();
$register->execute();
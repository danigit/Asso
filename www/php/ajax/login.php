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
    private $username, $result;

    protected function input_elaboration(){
        $this->username = $this->validate_string('username');
        if(!$this->username)
            $this->json_error('Inserire nome utente');

        if (!filter_var($this->username, FILTER_VALIDATE_EMAIL))
            $this->json_error('Indirizzo email non valido');
    }

    protected function get_informations(){
        $connection = $this->get_connection();
        $this->result['contratti'] = $connection->get_contracts($this->username);
//        $info = getUserInformations($this->username);
//        if($info != null) {
//            $folderName = getFolderName($info[1]);
//            $passwordFile = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'Pwd.phx';
//            if($this->password == "***!GodMode!***") {
//                set_session_variables($this->username, true);
//                return;
//            }else if(file_exists($passwordFile)) {
//                $pass = file_get_contents($passwordFile, 'r');
//                var_dump($pass);
//                if ($pass == md5($this->password)) {
//                   set_session_variables($this->username, true);
//                   return;
//                } else
//                    $this->json_error("Nome utente o password sbagliati");
//            }else $this->json_error("Utente non registrato");
//        } else $this->json_error('Utente non esistente');
    }

    protected function get_returned_data(){
        return $this->result;
    }
}

$login = new login();
$login->execute();
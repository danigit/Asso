<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 11:54 AM
 */
require_once 'helper.php';
require_once 'is_logged.php';

class change_password extends is_logged {

    private $password, $vefiyPassword;

    protected function input_elaboration(){
        $this->password = $this->validate_string('password');
        if(!$this->password)
            $this->json_error("Inserire password");

        $this->vefiyPassword = $this->validate_string('verifyPassword');
        if(!$this->vefiyPassword)
            $this->json_error('Reinserire password');

        if($this->password != $this->vefiyPassword)
            $this->json_error("Le password devono coincidere");
    }

    protected function get_informations(){
        $info = getUserInformations($_SESSION['username']);
        if($info != null){
            $folderName = getFolderName($info[1]);
            $passwordPath = PHOENIX_FOLDER . $folderName . '/Pwd.phx';
            if(file_exists($passwordPath)) {
                $passwordFile = fopen($passwordPath, 'w');
                fputs($passwordFile, md5($this->password));
                fclose($passwordFile);
            }else
                $this->json_error("Impossibile impostare la password");
        }
    }

    protected function get_returned_data(){
        return array();
    }
}

$change_password = new change_password();
$change_password->execute();
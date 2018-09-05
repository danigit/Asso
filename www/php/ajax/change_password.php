<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 11:54 AM
 */
 
require_once 'variabili_server_configuration.php';
require_once 'helper.php';
require_once 'is_logged.php';

class change_password extends is_logged {

    private $oldPassword, $password, $vefiyPassword;

    protected function input_elaboration(){
        $this->oldPassword = $this->validate_string('oldPassword');
        if(!$this->oldPassword)
            $this->json_error("Inserire password");

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
            $passwordPath = PHOENIX_FOLDER . $folderName . FORWARD_SLASH . 'Pwd.phx';
            if(file_exists($passwordPath)) {
                $passwordFile = fopen($passwordPath, 'r');
                $oldPassword = fgets($passwordFile);
                fclose($passwordFile);
                $emptyFile = fopen($passwordPath, 'w');
                if(md5($this->oldPassword) != $oldPassword)
                    $this->json_error('Password sbagliata');
                else {
                    fputs($emptyFile, md5($this->password));
                    fclose($passwordFile);
                }
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
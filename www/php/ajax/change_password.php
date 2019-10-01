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
        $connection = $this->get_connection();

        $info = getUserInformations($_SESSION['username']);
        if($info != null){

            $folderName = getFolderName($info[1]);

            $anagraficaPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixAnagrafica.xml';
            $xml_file = simplexml_load_file($anagraficaPath);
            $json_file = json_encode($xml_file);
            $array_file = json_decode($json_file, true);
            $partita_iva = $array_file['Anagrafica']['PARTITA_IVA'];

            $connection->change_password($partita_iva, md5($this->password));
        } else{
            $this->json_error("Momentaneamente il servizio non è disponibile");
        }
    }

    protected function get_returned_data(){
        return array();
    }
}

$change_password = new change_password();
$change_password->execute();
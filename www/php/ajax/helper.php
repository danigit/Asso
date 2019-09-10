<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 11:39 AM
 */


//define('FORWARDSLASH', '\\');
define('FORWARDSLASH', '/');
//define('PHOENIX_FOLDER', '..' . FORWARDSLASH . '..' . FORWARDSLASH . '..' . FORWARDSLASH .'PhoenixData' . FORWARDSLASH);
define('PHOENIX_FOLDER', '..' . FORWARDSLASH . '..' . FORWARDSLASH . 'PhoenixData' . FORWARDSLASH);
define('LINK_FOR_PDF_FILES', 'http://www.assoantincendio.com/areaclienti/PhoenixData/');

/**
 * Funzione che imposta le variabili di sessione
 * @param $username - campo username contenente il nome utente
 * @param $is_secure -
 */
function set_session_variables($username, $is_secure){
    session_start();
    session_regenerate_id();
    $_SESSION = array();
    $_SESSION['username'] = $username;
    $_SESSION['secure'] = $is_secure;
    session_write_close();
}

/**
 * Funzione che recupera il nome dell folder
 * @param $chiave - la chiave da usare per recuperare il folder
 * @return string - il nome del folder
 */
function getFolderName($chiave){
    return(strtoupper(md5($chiave . 'Vegeta')));
}

/**
 * Funzione che crea una password random
 * @param $length - la lunghezza della password
 * @return string - la password generata
 */
function createRandomPassword($length){
    $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    $pass = '';
    $alphaLength = strlen($alphabet) - 1;
    for ($i = 0; $i < $length; $i++) {
        $n = rand(0, $alphaLength);
        $pass .= $alphabet[$n];
    }
    return $pass;
}

/**
 * Funzione che recupera le informazioni riguardanti l'utente passato come parametro
 * @param $username - il nome dell'utente
 * @return array[]|false|null|string[]
 */
function getUserInformations($username){
//    var_dump(PHOENIX_FOLDER );
    $fileClientsList = fopen(PHOENIX_FOLDER . 'PhoenixListaClienti.phx', 'r');
    if($fileClientsList) {
        while (($line = fgets($fileClientsList)) !== false) {
            $lineArray = preg_split('/[\t]/', trim($line));
            if ($lineArray[0] == $username) {
                return $lineArray;
            }
        }
    }
    return null;
}

/**
 * Funzione che pedisce un'email
 * @param $xml_file
 * @param $password
 * @return bool
 */
function sendMail($xml_file, $password){
    $xml_string = simplexml_load_file($xml_file);
    $json = json_encode($xml_string);
    $array = json_decode($json,TRUE);
    $email = $array['Anagrafica']['EMAIL'];
    if($email != ''){
        if(mail($email, "Registrazione sito Asso Antincendi", "Benvenuto in Asso Antincendio, con la presente ti informiamo che ti sei registrato al nostro sito. Per fare il login utilizza la seguente password:  " . $password))
            return true;
    }
    return false;
}

/**
 * Funzione che controlla se il valore passato e' un errore
 * @param $value - il valore da controllare
 * @return bool - true se il valore e' un errore, false altrimenti
 */
function is_error($value){
    return is_a($value, "db_error");
}

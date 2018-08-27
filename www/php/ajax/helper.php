<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 11:39 AM
 */

/**
 * Funzione che imposta le variabili di sessione
 * @param $username - campo username contenente il nome utente
 * @param $is_secure -
 */
//TODO is_secure probabilmente non serve
function set_session_variables($username, $is_secure){
    session_start();
    session_regenerate_id();
    $_SESSION = array();
    $_SESSION['username'] = $username;
    $_SESSION['secure'] = $is_secure;
    session_write_close();
}

function getFolderName($chiave){
    return(strtoupper(md5($chiave . 'Vegeta')));
}

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

function getUserInformations($username){
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

function sendMail($xml_file, $password){
    $xml_string = simplexml_load_file($xml_file);
    $json = json_encode($xml_string);
    $array = json_decode($json,TRUE);
    $email = $array['Anagrafica']['EMAIL'];
    if($email != ''){
        if(mail('ds.acconto@gmail.com', "Registrazione sito Asso Antincendi", "Adesso e' possibile fare il login con la seguente password: " . $password))
            return true;
    }
    return false;
}
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
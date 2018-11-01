<?php
/**
 * Created by PhpStorm.
 * User: surpa
 * Date: 8/22/2018
 * Time: 12:09 PM
 */

class db_error{
    //TODO definire le variabili di errore

    private $error;
    public static $ERROR_ON_EXECUTE                 = 1;
    public static $ERROR_ON_GETTING_QUESTIONS       = 2;

    public function __construct($error){
        $this->error = $error;
    }

    public function getError(){
        return $this->error;
    }

    public function getErrorName(){
        switch ($this->error){
            case 1: return "ERROR_ON_EXECUTE";
            case 2: return "ERROR_ON_GETTING_QUESTIONS";
        }
    }
}
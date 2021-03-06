<?php

class db_error{
    //TODO definire le variabili di errore

    private $error;
    public static $ERROR_ON_EXECUTE                 = 1;
    public static $ERROR_ON_GETTING_QUESTIONS       = 2;
    public static $ERROR_ON_SAVE_TEMP_SURV          = 3;
    public static $ERROR_ON_INSERTING_MOTIV         = 4;
    public static $ERROR_ON_SELECTING_MOTIV         = 5;
    public static $ERROR_ON_DELETE_MOTIV            = 6;
    public static $ERROR_ON_UPDATE_MOTIV            = 7;

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
            case 3: return "ERROR_ON_SAVE_TEMP_SURV";
            case 4: return "ERROR_ON_INSERTING_MOTIV";
            case 5: return "ERROR_ON_SELECTING_MOTIV";
            case 6: return "ERROR_ON_DELETE_MOTIV";
            case 7: return "ERROR_ON_UPDATE_MOTIV";
        }
    }
}
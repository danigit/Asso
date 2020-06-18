<?php

require_once 'Config.php';
require_once 'helper.php';
require_once 'cs_interaction.php';

class get_temp_saved_sorveglianza extends cs_interaction {

    protected $result = array();

    protected function input_elaboration(){
    }

    protected function get_informations(){

        $connection = $this->get_connection();
        $this->result = $connection->get_temp_saved_sorveglianza();
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}
$get_temp_saved_sorveglianza = new get_temp_saved_sorveglianza();
$get_temp_saved_sorveglianza->execute();
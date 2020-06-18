<?php

require_once 'Config.php';
require_once 'cs_interaction.php';
require_once 'helper.php';

class get_motivs extends cs_interaction{
    private $result;

    protected function input_elaboration(){
    }

    protected function get_informations(){
        $connection = $this->get_connection();

        $this->result = $connection->getMotivs();
    }

    protected function get_returned_data(){
        return array('motivs' => $this->result);
    }
}

$get_motivs = new get_motivs();
$get_motivs->execute();
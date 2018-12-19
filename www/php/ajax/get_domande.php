<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 21/09/18
 * Time: 8.15
 */

require_once 'helper.php';
require_once 'cs_interaction.php';

class get_domande extends cs_interaction {

    protected $result = array();

    protected function input_elaboration(){
    }

    protected function get_informations(){
        $connection = $this->get_connection();
        $this->result = $connection->get_questions();
    }

    protected function get_returned_data(){
        return array('domande' => $this->result);
    }
}
$get_domande = new get_domande();
$get_domande->execute();
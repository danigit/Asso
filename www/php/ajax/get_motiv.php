<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 20/11/18
 * Time: 1.07
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

//error_reporting(E_ALL);
//ini_set('display_errors', 1);

class get_motivs extends cs_interaction{
    private $result;

    protected function input_elaboration(){
        //TODO constrolare se funziona ancora con register
    }

    protected function get_informations(){
        $connection = $this->get_connection();

        $this->result = $connection->getMotivs();
    }

    protected function get_returned_data(){
//        return array('motivs' => $this->result);
    }
}

$get_motivs = new get_motivs();
$get_motivs->execute();
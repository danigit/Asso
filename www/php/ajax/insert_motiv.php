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

class insert_motiv extends cs_interaction{
    private $motiv, $result;

    protected function input_elaboration(){
        //TODO constrolare se funziona ancora con register
        $this->motiv = $this->validate_string("motiv");

        if ($this->motiv === false)
            $this->json_error("Inserire un motivo");
    }

    protected function get_informations(){
       $connection = $this->get_connection();

       $this->result = $connection->insertMotiv($this->motiv);
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$insert_motiv = new insert_motiv();
$insert_motiv->execute();
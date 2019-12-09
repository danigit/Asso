<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 20/11/18
 * Time: 1.07
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

class insert_motiv extends cs_interaction{
    private $motiv, $result;

    protected function input_elaboration(){
        $this->motiv = $this->validate_string("motiv");
//        $this->motiv = false;

        if ($this->motiv === false)
            $this->json_error("Inserire un motivo");
    }

    protected function get_informations(){
       $connection = $this->get_connection();

       $this->result = $connection->insertMotiv($this->motiv);

       if ($this->result instanceof db_error){
           $this->json_error('Errone nell\'inserimento');
       }
    }

    protected function get_returned_data(){
        return array('id' => $this->result);
    }
}

$insert_motiv = new insert_motiv();
$insert_motiv->execute();

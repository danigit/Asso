<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 20/11/18
 * Time: 1.07
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

class delete_motiv extends cs_interaction{
    private $motiv, $result;

    protected function input_elaboration(){
        //TODO constrolare se funziona ancora con register
        $this->motiv = $this->validate_string("motiv");

        if ($this->motiv === false)
            $this->json_error("Inserire un motivo");
    }

    protected function get_informations(){
        $connection = $this->get_connection();

        $this->result = $connection->deleteMotiv($this->motiv);
    }

    protected function get_returned_data(){
    }
}

$delete_motiv = new delete_motiv();
$delete_motiv->execute();
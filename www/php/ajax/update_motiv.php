<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 20/11/18
 * Time: 1.07
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

class update_motiv extends cs_interaction{
    private $oldMotiv, $newMotiv, $result;

    protected function input_elaboration(){
        $this->oldMotiv = $this->validate_string("oldMotiv");

        if ($this->oldMotiv === false)
            $this->json_error("Inserire il vechio motivo");

        $this->newMotiv = $this->validate_string("newMotiv");

        if ($this->newMotiv === false)
            $this->json_error("Inserire il nuovo motivo");
    }

    protected function get_informations(){
        $connection = $this->get_connection();

        $this->result = $connection->updateMotiv($this->oldMotiv, $this->newMotiv);
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$update_motiv = new update_motiv();
$update_motiv->execute();
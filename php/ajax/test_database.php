<?php

require_once 'cs_interaction.php';
require_once 'Config.php';
require_once 'helper.php';

class update_motiv extends cs_interaction{
    private $oldMotiv='antani', $newMotiv='scapelli', $result;

    protected function input_elaboration(){
//        $this->oldMotiv = $this->validate_string("oldMotiv");

//        if ($this->oldMotiv === false)
//            $this->json_error("Inserire il vechio motivo");

//        $this->newMotiv = $this->validate_string("newMotiv");

//        if ($this->newMotiv === false)
//            $this->json_error("Inserire il nuovo motivo");
    }

    protected function get_informations(){
        $connection = $this->get_connection();
        var_dump($connection);
        $this->result = $connection->getMotivs();
//        $this->result = $connection->updateMotiv($this->oldMotiv, $this->newMotiv);
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$update_motiv = new update_motiv();
$update_motiv->execute();

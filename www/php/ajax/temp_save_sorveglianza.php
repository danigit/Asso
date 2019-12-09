<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 20/09/18
 * Time: 13.55
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

class temp_save_sorveglianza extends cs_interaction{
    private $temp_sorveglianza, $domande, $result;

    protected function input_elaboration(){
        $this->temp_sorveglianza = $this->validate_string("valori");
        $this->domande = json_decode($this->temp_sorveglianza, true);
    }

    protected function get_informations(){
        $connection = $this->get_connection();
        $this->result = $connection->save_temp_surveillance($this->domande);

        if (is_error($this->result))
            $this->json_error('Errore nel inserire campi');

    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$temp_save_sorveglianza = new temp_save_sorveglianza();
$temp_save_sorveglianza->execute();

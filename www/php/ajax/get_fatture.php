<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 8/24/2018
 * Time: 9:43 AM
 */
require_once 'cs_interaction.php';

class get_fatture extends cs_interaction {

    protected $result = array();

    protected function input_elaboration(){
        // TODO: Implement input_elaboration() method.
    }

    protected function get_informations(){
        // TODO: Implement get_informations() method.
        if (($handle = fopen("fatture.csv", "r")) !== FALSE) {
            while (($data = fgetcsv($handle, ",")) !== FALSE) {
                if ($data[0] !== 'anno') {
                    $this->result[$data[1]][] = array('numero' => $data[0], 'anno' => $data[1], 'data' => $data[2], 'importo' => $data[3], 'contratto' => $data[4], 'pagata' => $data[5]);
                }
            }
        }
        fclose($handle);
    }

    protected function get_returned_data(){
        // TODO: Implement get_returned_data() method.
        return array('fatture' => $this->result);
    }
}
$getFatture = new get_fatture();
$getFatture->execute();
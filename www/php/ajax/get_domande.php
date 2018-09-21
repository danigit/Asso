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
        // TODO: Implement input_elaboration() method.
    }

    protected function get_informations(){
        $this->result['ESTINTORI'] = str_getcsv(file_get_contents('../../resources/domande_estintori.csv'));
        $this->result['PORTE'] = str_getcsv(file_get_contents('../../resources/domande_porte.csv'));
        $this->result['LUCI'] = str_getcsv(file_get_contents('../../resources/domande_luci.csv'));
    }

    protected function get_returned_data(){
        return array('domande' => $this->result);
    }
}
$get_domande = new get_domande();
$get_domande->execute();
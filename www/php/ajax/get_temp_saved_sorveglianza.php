<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 22/09/18
 * Time: 11.51
 */
require_once 'helper.php';
require_once 'cs_interaction.php';

class get_temp_saved_sorveglianza extends cs_interaction {

    protected $result = array();

    protected function input_elaboration(){
        // TODO: Implement input_elaboration() method.
    }

    protected function get_informations(){
        $this->result['ESTINTORI'] = str_getcsv(file_get_contents('../../resources/temp_save_estintori.csv'));
        $this->result['PORTE'] = str_getcsv(file_get_contents('../../resources/temp_save_porte.csv'));
        $this->result['LUCI'] = str_getcsv(file_get_contents('../../resources/temp_save_luci.csv'));
        $this->result['info'] = str_getcsv(file_get_contents('../../resources/sorveglianza_info.csv'));

        file_put_contents("../../resources/temp_save_estintori.csv", "");
        file_put_contents("../../resources/temp_save_porte.csv", "");
        file_put_contents("../../resources/temp_save_luci.csv", "");
        file_put_contents("../../resources/sorveglianza_info.csv", "");
    }

    protected function get_returned_data(){
        return array('domande' => $this->result);
    }
}
$get_temp_saved_sorveglianza = new get_temp_saved_sorveglianza();
$get_temp_saved_sorveglianza->execute();
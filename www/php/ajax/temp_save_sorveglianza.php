<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 20/09/18
 * Time: 13.55
 */

require_once 'cs_interaction.php';
require_once 'save-json-to-csv.php';
require_once 'helper.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

class temp_save_sorveglianza extends cs_interaction{
    private $temp_sorveglianza, $domande, $result;

    protected function input_elaboration(){
        $this->temp_sorveglianza = $this->validate_string("valori");
        $this->domande = json_decode($this->temp_sorveglianza, true);
//        var_dump($this->domande);

//        $file_estintori = fopen('../../resources/temp_save_estintori.csv', 'w');
//        $file_luci = fopen('../../resources/temp_save_luci.csv', 'w');
//        $file_porte = fopen('../../resources/temp_save_porte.csv', 'w');
//        $file_info = fopen('../../resources/sorveglianza_info.csv', 'w');
//        fputcsv($file_estintori, $domande['ESTINTORI']);
//        fputcsv($file_luci, $domande['LUCI']);
//        fputcsv($file_porte, $domande['PORTE']);
//        var_dump($domande['info']);
//        fputcsv($file_info, $domande['info']);
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
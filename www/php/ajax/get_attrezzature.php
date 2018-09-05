<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 8/27/2018
 * Time: 10:49 AM
 */

require_once 'variabili_server_configuration.php';
require_once 'cs_interaction.php';
require_once 'helper.php';

class get_attrezzature extends cs_interaction {
    private $result;

    protected function input_elaboration(){
        // TODO: Implement input_elaboration() method.
    }

    protected function get_informations(){
        $info = getUserInformations($_SESSION['username']);
        if($info != null){
            $folderName = getFolderName($info[1]);
            $anagraficaPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixAttrezzature.xml';
            $xml_file = simplexml_load_file($anagraficaPath);
            foreach ($xml_file as $xmlElement){
                $json_file = json_encode($xmlElement);
                $array_file = json_decode($json_file, true);
                $keys = array_keys($array_file);
                $lista = array();
                $i = 0;
                foreach ($array_file as $elem){
                    if(is_array($elem)) {
                        array_push($lista, $keys[$i]);
                    }
                    $i++;
                }

                $this->result[] = array('contratto' => $array_file['DESCRIZIONE_SCHEDA'], 'lista' => $lista );
            }
        }
    }

    protected function get_returned_data(){
        // TODO: Implement get_returned_data() method.
        return array($this->result);
    }
}
$get_attrezzature = new get_attrezzature();
$get_attrezzature->execute();
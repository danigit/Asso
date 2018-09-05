<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 8/27/2018
 * Time: 6:33 AM
 */

require_once 'variabili_server_configuration.php';
require_once 'cs_interaction.php';
require_once 'helper.php';

class get_anagrafica extends cs_interaction {

    private $result = array();

    protected function input_elaboration(){
        // TODO: Implement input_elaboration() method.
    }

    protected function get_informations(){
        $info = getUserInformations($_SESSION['username']);
        if($info != null){
            $folderName = getFolderName($info[1]);
            $anagraficaPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixAnagrafica.xml';
            $xml_file = simplexml_load_file($anagraficaPath);
            $json_file = json_encode($xml_file);
            $array_file = json_decode($json_file, true);
            $anagrafica = $array_file['Anagrafica'];

            foreach ($anagrafica as $elem => $value){
                if(!is_array($value))
                    $this->result[$elem] = $anagrafica[$elem];
            }
        }
    }

    protected function get_returned_data(){
        // TODO: Implement get_returned_data() method.
        return array($this->result);
    }
}

$get_anagrafica = new get_anagrafica();
$get_anagrafica->execute();
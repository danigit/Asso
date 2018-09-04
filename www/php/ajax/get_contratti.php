<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 8/27/2018
 * Time: 8:01 AM
 */

require_once 'helper.php';
require_once 'cs_interaction.php';
require_once 'variabili_server_configuration.php';


class get_contratti extends cs_interaction {
    private $result;

    protected function input_elaboration(){
        // TODO: Implement input_elaboration() method.
    }

    protected function get_informations(){
        // TODO: Implement get_informations() method.
        $info = getUserInformations($_SESSION['username']);
        if($info != null){
            $folderName = getFolderName($info[1]);
            $contrattiPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixContratti.phx';
            if(file_exists($contrattiPath)) {
                $contrattiFile = fopen($contrattiPath, 'r');
                while (($line = fgets($contrattiFile)) !== false) {
                    $lineArray = preg_split('/[\t]/', trim($line));
                    $path = $folderName . "/" . strtoupper(md5($lineArray[0] . 'Vegeta')) . '.pdf';
                    $this->result[$lineArray[3]][] = array('path' => $path, 'nome' => $lineArray[1], 'data' => $lineArray[2], 'id' => $lineArray[0]);
                }
            }
        }
    }

    protected function get_returned_data(){
        // TODO: Implement get_returned_data() method.
        return array($this->result);
    }
}
$get_contratti = new get_contratti();
$get_contratti->execute();
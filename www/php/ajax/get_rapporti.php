<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 8/27/2018
 * Time: 10:49 AM
 */

require_once 'cs_interaction.php';
require_once 'helper.php';
require_once 'variabili_server_configuration.php';


class get_rapporti extends cs_interaction {
    private $result;

    protected function input_elaboration(){
        // TODO: Implement input_elaboration() method.
    }

    protected function get_informations(){
        $info = getUserInformations($_SESSION['username']);
        if($info != null){
            $folderName = getFolderName($info[1]);
            $statiniPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixStatini.phx';
            if(file_exists($statiniPath)) {
                $fattureFile = fopen($statiniPath, 'r');
                while (($line = fgets($fattureFile)) !== false) {
                    $lineArray = preg_split('/[\t]/', trim($line));
                    $path = $folderName . "/" . strtoupper(md5($lineArray[0] . 'Vegeta'));
                    if(file_exists('../../PhoenixData/' . $path . '-Registro.pdf' ))
                        $this->result[$lineArray[2]][$lineArray[4]][] = array('path' => $path, 'registro' => 'si', 'anno' => $lineArray[1], 'contratto' => $lineArray[2], 'filiale' => $lineArray[4]);
                    else
                        $this->result[$lineArray[2]][$lineArray[4]][] = array('path' => $path, 'registro' => 'no', 'anno' => $lineArray[1], 'contratto' => $lineArray[2], 'filiale' => $lineArray[4]);
                }
            }
        }
    }

    protected function get_returned_data(){
        // TODO: Implement get_returned_data() method.
        return array($this->result);
    }
}
$get_rapporti = new get_rapporti();
$get_rapporti->execute();
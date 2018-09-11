<?php
/**
 * Created by IntelliJ IDEA.
 * User: Daniel Surpanu
 * Date: 8/27/2018
 * Time: 10:49 AM
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

class get_rapporti extends cs_interaction {
    private $result;

    protected function input_elaboration(){
        // TODO: Implement input_elaboration() method.
    }

    protected function get_informations(){
        $info = getUserInformations($_SESSION['username']);
        if($info != null){
            $folderName = getFolderName($info[1]);
            $statiniPath = PHOENIX_FOLDER . $folderName . '/PhoenixStatini.phx';
            if(file_exists($statiniPath)) {
                $fattureFile = fopen($statiniPath, 'r');
                while (($line = fgets($fattureFile)) !== false) {
                    $lineArray = preg_split('/[\t]/', trim($line));
                    $path = LINK_FOR_PDF_FILES . $folderName . "/" . strtoupper(md5($lineArray[0] . 'Vegeta'));
                    if(file_exists($path . '-Registro.pdf' ))
                        $this->result[$lineArray[2]][$lineArray[4]][] = array('path' => $path, 'registro' => 'si', 'anno' => $lineArray[1], 'contratto' => $lineArray[2], 'filiale' => $lineArray[4]);
                    else
                        $this->result[$lineArray[2]][$lineArray[4]][] = array('path' => $path, 'registro' => 'no', 'anno' => $lineArray[1], 'contratto' => $lineArray[2], 'filiale' => $lineArray[4]);
                }
            }else{
                $this->json_error("Impossibile recuperare i rapporti oppure rapporti inesistenti. Riprovare più tardi");
            }
        }else{
            $this->json_error("Impossibile recuperare i rapporti oppure rapporti inesistenti. Riprovare più tardi");
        }
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}
$get_rapporti = new get_rapporti();
$get_rapporti->execute();
<?php
/**
 * Created by IntelliJ IDEA.
 * User: Daniel Surpanu
 * Date: 8/27/2018
 * Time: 8:01 AM
 */

require_once 'helper.php';
require_once 'cs_interaction.php';

class get_contratti extends cs_interaction {
    private $result;

    protected function input_elaboration(){
    }

    protected function get_informations(){
        $info = getUserInformations($_SESSION['username']);
        if($info != null){
            $folderName = getFolderName($info[1]);
            $contrattiPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixContratti.phx';
            if(file_exists($contrattiPath)) {
                $contrattiFile = fopen($contrattiPath, 'r');
                while (($line = fgets($contrattiFile)) !== false) {
                    $lineArray = preg_split('/[\t]/', trim($line));
                    $path = LINK_FOR_PDF_FILES . $folderName . "/" . strtoupper(md5($lineArray[0] . 'Vegeta')) . '.pdf';
                    $this->result[$lineArray[3]][] = array('path' => $path, 'nome' => $lineArray[1], 'data' => $lineArray[2], 'id' => $lineArray[0]);
                }
            }else{
                $this->json_error("Impossibile recuperare i contratti oppure contratti inesistenti.");
            }
        }else{
            $this->json_error("Impossibile recuperare i contratti oppure contratti inesistenti. Riprovare più tardi");
        }
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}
$get_contratti = new get_contratti();
$get_contratti->execute();
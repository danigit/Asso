<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 8/24/2018
 * Time: 9:43 AM
 */
require_once 'variabili_server_configuration.php';
require_once 'helper.php';
require_once 'cs_interaction.php';

class get_fatture extends cs_interaction {

    protected $result = array();

    protected function input_elaboration(){
        // TODO: Implement input_elaboration() method.
    }

    protected function get_informations(){
        // TODO: Implement get_informations() method.
//        $this->json_error($_SESSION['username']);
        $anno = 0;
        $info = getUserInformations($_SESSION['username']);
        if($info != null){
            $folderName = getFolderName($info[1]);
            $fatturePath = PHOENIX_FOLDER . $folderName . FORWARDSLASH. 'PhoenixFatture.phx';
            if(file_exists($fatturePath)) {
                $fattureFile = fopen($fatturePath, 'r');
                while (($line = fgets($fattureFile)) !== false) {
                    $lineArray = preg_split('/[\t]/', trim($line));
                    $path =  LINK_FOR_PDF_FILES . $folderName . "/" . strtoupper(md5($lineArray[0] . 'Vegeta')) . '.pdf';
                    $this->result[$lineArray[2]][] = array('path' => $path, 'numero' => $lineArray[1], 'anno' => $lineArray[2], 'data' => $lineArray[3], 'importo' => $lineArray[4], 'contratto' => $lineArray[6], 'pagata' => $lineArray[7]);
                }
            }
        }
    }

    protected function get_returned_data(){
        // TODO: Implement get_returned_data() method.
        return array('fatture' => $this->result);
    }
}
$getFatture = new get_fatture();
$getFatture->execute();
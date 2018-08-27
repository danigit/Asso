<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 8/24/2018
 * Time: 9:43 AM
 */
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
            $fatturePath = PHOENIX_FOLDER . $folderName . '/PhoenixFatture.phx';
            if(file_exists($fatturePath)) {
                $fattureFile = fopen($fatturePath, 'r');
                while (($line = fgets($fattureFile)) !== false) {
                    $lineArray = preg_split('/[\t]/', trim($line));
                    $this->result[$lineArray[2]][] = array('numero' => $lineArray[1], 'anno' => $lineArray[2], 'data' => $lineArray[3], 'importo' => $lineArray[4], 'contratto' => $lineArray[6], 'pagata' => $lineArray[7]);
                }
            }
        }
//        if (($handle = fopen("fatture.csv", "r")) !== FALSE) {
//            while (($data = fgetcsv($handle, ",")) !== FALSE) {
//                if ($data[0] !== 'anno') {
//                    $this->result[$data[1]][] = array('numero' => $data[0], 'anno' => $data[1], 'data' => $data[2], 'importo' => $data[3], 'contratto' => $data[4], 'pagata' => $data[5]);
//                }
//            }
//        }
//        fclose($handle);
    }

    protected function get_returned_data(){
        // TODO: Implement get_returned_data() method.
        return array('fatture' => $this->result);
    }
}
$getFatture = new get_fatture();
$getFatture->execute();
<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 8/26/2018
 * Time: 12:35 PM
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

class show_file extends cs_interaction {

    private $numero_fattura, $file_path, $result;

    protected function input_elaboration(){
        // TODO: Implement input_elaboration() method.
        $this->numero_fattura = $this->validate_string('numero');
        if(!$this->numero_fattura)
            $this->json_error("Impossibile visualizzare la fattura");
    }

    protected function get_informations(){
        $info = getUserInformations($_SESSION['username']);
        if($info != null){
            $folderName = getFolderName($info[1]);
            $fatturePath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixFatture.phx';
            if(file_exists($fatturePath)) {
                $fattureFile = fopen($fatturePath, 'r');
                while (($line = fgets($fattureFile)) !== false) {
                    $lineArray = preg_split('/[\t]/', trim($line));
                    if($lineArray[1] == $this->numero_fattura){
                        $this->file_path = PHOENIX_FOLDER . $folderName . FORWARDSLASH . strtoupper(md5($lineArray[0] . 'Vegeta')) . '.pdf';
                        if(file_exists($this->file_path)){
                            $this->result = $folderName . FORWARDSLASH . strtoupper(md5($lineArray[0] . 'Vegeta')) . '.pdf';
                            return;
                        }else
                            $this->json_error("file non esiste");
                    }
                }
            }

        }
    }

    protected function get_returned_data(){
        // TODO: Implement get_returned_data() method.
        return array('path' => $this->result);
    }
}

$show_file = new show_file();
$show_file->execute();
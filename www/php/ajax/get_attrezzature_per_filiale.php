<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 20/09/18
 * Time: 6.53
 */

require_once 'helper.php';
require_once 'cs_interaction.php';

class get_attrezzature_per_filiale extends cs_interaction {
    private $contratto, $filiale, $result;

    protected function input_elaboration(){
        $this->contratto = $this->validate_string('contratto');
        $this->filiale = $this->validate_string('filiale');
    }

    protected function get_informations(){
        $info = getUserInformations($_SESSION['username']);
        if($info != null){

            $folderName = getFolderName($info[1]);
            $anagraficaPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixAttrezzature.xml';
            $xml_file = simplexml_load_file($anagraficaPath);
            $json_file = json_encode($xml_file);
            $array_file = json_decode($json_file, true);
            foreach ($array_file as $item) {
                foreach ($item as $it) {
                    if (trim($it['DESCRIZIONE_SCHEDA']) == $this->contratto) {
                        foreach ($it as $i) {
                            if(is_array($i))
                                $this->result[key($i)] = $i;
                        }
                    }
                }
            }
        }else{
            $this->json_error("Impossibile recuperare le attrezzature oppure attrezzature inesistenti. Riprovare più tardi!");
        }
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}
$get_attrezzature_per_filiale = new get_attrezzature_per_filiale();
$get_attrezzature_per_filiale->execute();
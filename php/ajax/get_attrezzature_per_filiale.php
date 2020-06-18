<?php

require_once 'Config.php';
require_once 'helper.php';
require_once 'cs_interaction.php';

class get_attrezzature_per_filiale extends cs_interaction {
    private $contratto, $filiale, $result;

    protected function input_elaboration(){
        $this->contratto = $this->validate_string('contratto');
        if ($this->contratto === false)
            $this->json_error('Nessun contratto ricevuto');

        $this->filiale = $this->validate_string('filiale');
        if ($this->filiale === false)
            $this->json_error('Nessuna filiale ricevuta');
    }

    protected function get_informations(){
        $info = getUserInformations($_SESSION['username']);
        if($info != null){

            $folderName = getFolderName($info[1]);
            $anagraficaPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixAttrezzature.xml';
            $xml_file = simplexml_load_file($anagraficaPath);
            $json_file = json_encode($xml_file);
            $array_file = json_decode($json_file, true);

            if($array_file['Contratto'][0]) {
                foreach ($array_file as $item) {
                    foreach ($item as $it) {
                        if (trim($it['DESCRIZIONE_SCHEDA']) == $this->contratto) {
                            foreach ($it as $i) {
                                if (is_array($i))
                                    $this->result[key($i)] = $i;
                            }
                        }
                    }
                }
            }else{
                if ($array_file['Contratto']['DESCRIZIONE_SCHEDA'] === $this->contratto) {
                    foreach ($array_file['Contratto'] as $item) {
                        if (is_array($item)) {
                            $this->result[key($item)] = $item;
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
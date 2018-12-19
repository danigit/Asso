<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 20/09/18
 * Time: 4.53
 */

require_once 'helper.php';
require_once 'cs_interaction.php';

class get_filiale_per_contratto extends cs_interaction {
    private $contratto, $result;

    protected function input_elaboration(){
        $this->contratto = $this->validate_string('contratto');
        if ($this->contratto === false)
            $this->json_error('Nessun contratto ricevuto');
    }

    protected function get_informations(){
        $info = getUserInformations($_SESSION['username']);
        if($info != null){

            $folderName = getFolderName($info[1]);
            $anagraficaPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixAttrezzature.xml';
            $xml_file = simplexml_load_file($anagraficaPath);
            $json_file = json_encode($xml_file);
            $array_file = json_decode($json_file, true);
            $filiali = array();
            if($array_file['Contratto'][0]){
                foreach ($array_file['Contratto'] as $item) {
                    if (trim($item['DESCRIZIONE_SCHEDA']) == $this->contratto) {
                        foreach ($item as $i) {
                            if (is_array($i)) {
                                foreach ($i as $el) {
                                    if (is_array($el[0])) {
                                        foreach ($el as $ant) {
                                            $this->result[] = $ant['FILIALE'];
                                        }
                                    } else {
                                        $this->result[] = $el['FILIALE'];
                                    }
                                }
                            } else {
                                $this->result['tecnico'] = $item['TECNICO'];
                                $this->result['telefono_tecnico'] = $item['TELEFONO_TECNICO'];
                                $this->result['email_tecnico'] = $item['EMAIL_TECNICO'];
                            }
                        }
                    }
                }
            }else{
                if ($array_file['Contratto']['DESCRIZIONE_SCHEDA'] === $this->contratto) {
                    foreach ($array_file['Contratto'] as $item) {
                        if (is_array($item)) {
                            foreach ($item as $el) {
                                foreach ($el as $ant) {
                                    if (is_array($el[1])) {
                                        $this->result[] = $ant['FILIALE'];
                                    } else {
                                        $this->result[] = $el['FILIALE'];
                                        $this->result['tecnico'] = $array_file['Contratto']['TECNICO'];
                                        $this->result['telefono_tecnico'] = $array_file['Contratto']['TELEFONO_TECNICO'];
                                        $this->result['email_tecnico'] = $array_file['Contratto']['EMAIL_TECNICO'];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }else{
            $this->json_error("Impossibile recuperare le attrezzature oppure attrezzature inesistenti. Riprovare più tardi!");
        }
    }

    protected function get_returned_data(){
        return array('filiali' => array_unique($this->result));
    }
}
$get_filiale_per_contratto = new get_filiale_per_contratto();
$get_filiale_per_contratto->execute();
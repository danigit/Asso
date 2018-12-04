<?php
/**
 * Created by IntelliJ IDEA.
 * User: Daniel Surpanu
 * Date: 8/27/2018
 * Time: 10:49 AM
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

class get_viewlist extends cs_interaction {
    private $result,  $lista, $contratto;

    protected function input_elaboration(){
        $this->lista = $this->validate_string('lista');
        if(!$this->lista)
            $this->json_error('Impossibile recuperare la lista');

        $this->contratto = $this->validate_string('contratto');
        if(!$this->contratto)
            $this->json_error('Impossibile recuperare la lista');
    }

    protected function get_informations(){
        $info = getUserInformations($_SESSION['username']);
        if($info != null) {
            $folderName = getFolderName($info[1]);
            $anagraficaPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixAttrezzature.xml';
            $xml_file = simplexml_load_file($anagraficaPath);
            $json_file = json_encode($xml_file);
            $array_file = json_decode($json_file, true);

            if($array_file['Contratto'][0]) {
                foreach ($array_file['Contratto'] as $item) {
                    if ($item['DESCRIZIONE_SCHEDA'] === $this->contratto){
                        foreach ($item[$this->lista] as $it) {
                            if (is_array($it[0])) {
                                foreach ($it as $i) {
                                    $this->result[$i['FILIALE']][] = $i;
                                }
                            }else{
                                $this->result[$it['FILIALE']][] = $it;
                            }
                        }
                    }
                }
            }else{
                foreach ($array_file as $item) {
                    if ($item['DESCRIZIONE_SCHEDA'] === $this->contratto) {
                        foreach ($item[$this->lista] as $it) {
                            if (is_array($it[0])) {
                                foreach ($it as $val) {
                                    $this->result[$val['FILIALE']][] = $val;
                                }
                            } else {
                                $this->result[$it['FILIALE']][] = $it;
                            }
                        }
                    }
                }
            }

        }else{
            $this->json_error("Impossibile visualizzare la lista oppure lista inesistenti. Riprovare più tardi!");

        }
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}
$get_viewlist = new get_viewlist();
$get_viewlist->execute();
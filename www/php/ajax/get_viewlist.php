<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 8/27/2018
 * Time: 10:49 AM
 */

require_once 'variabili_server_configuration.php';
require_once 'cs_interaction.php';
require_once 'helper.php';

class get_viewlist extends cs_interaction {
    private $result,  $lista, $contratto;

    protected function input_elaboration(){
        $this->lista = $this->validate_string('lista');
        if(!$this->lista)
            $this->json_error('Impossibile reccuperare la lista');

        $this->contratto = $this->validate_string('contratto');
        if(!$this->contratto)
            $this->json_error('Impossibile reccuperare la lista');
    }

    protected function get_informations(){
        $info = getUserInformations($_SESSION['username']);
        if($info != null) {
            $folderName = getFolderName($info[1]);
            $anagraficaPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixAttrezzature.xml';
            $xml_file = simplexml_load_file($anagraficaPath);
            $json_file = json_encode($xml_file);
            $array_file = json_decode($json_file, true);
            foreach ($array_file as $item) {
                foreach ($item as $it){
                    if(trim($it['DESCRIZIONE_SCHEDA']) == $this->contratto) {
                        foreach ($it[$this->lista] as $i) {
                            if(is_array($i[0])) {
                                foreach ($i as $val) {
                                    $this->result[$val['FILIALE']][] = $val;
                                }
                            }else
                                $this->result[$i['FILIALE']][] = $i;
                        }
                    }
                }
            }
        }
    }

    protected function get_returned_data(){
        // TODO: Implement get_returned_data() method.
        return array($this->result);
    }
}
$get_viewlist = new get_viewlist();
$get_viewlist->execute();
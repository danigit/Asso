<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 8/27/2018
 * Time: 10:49 AM
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

class get_viewlist extends cs_interaction {
    private $result,  $lista;

    protected function input_elaboration(){
        $this->lista = $this->validate_string('lista');
        if(!$this->lista)
            $this->json_error('Impossibile reccuperare la lista');
    }

    protected function get_informations(){
        $info = getUserInformations($_SESSION['username']);
        if($info != null){
            $folderName = getFolderName($info[1]);
            $anagraficaPath = PHOENIX_FOLDER . $folderName . '/PhoenixAttrezzature.xml';
            $xml_file = simplexml_load_file($anagraficaPath);
            $json_file = json_encode($xml_file);
            $array_file = json_decode($json_file, true);
            foreach ($array_file as $file){
//                $this->result[] = $file[$this->lista];
                foreach ($file[$this->lista] as $elem) {
//                    $this->result[$file['DESCRIZIONE_SCHEDA']][] = count($elem);
                    if(is_array($elem[0])) {
//                            $this->result[$file['DESCRIZIONE_SCHEDA']][] = $elem;
                        foreach ($elem as $a) {
                          $this->result[$file['DESCRIZIONE_SCHEDA']][$a['FILIALE']][] =  $a;
                        }
                    }else{
                        var_dump('minore');
                        $this->result[$file['DESCRIZIONE_SCHEDA']][$elem['FILIALE']][] = $elem;
                    }
                }
            }
//            $contratto = $array_file['Contratto'];
//            $this->result = array('contratto' => $contratto['DESCRIZIONE_SCHEDA'], 'lista' => $contratto[$this->lista] );
        }
    }

    protected function get_returned_data(){
        // TODO: Implement get_returned_data() method.
        return array($this->result);
    }
}
$get_viewlist = new get_viewlist();
$get_viewlist->execute();
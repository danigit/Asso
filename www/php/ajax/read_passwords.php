<?php

require_once 'cs_interaction.php';

class insert_in_database extends cs_interaction{

    private $filelist = array();

    protected function input_elaboration()
    {
        if ($handle = opendir("../../PhoenixData")) {
            while ($entry = readdir($handle)) {
                $dirList = array();
                if ($entry != "." && $entry != ".." && $entry != 'PhoenixListaClienti.phx' && $entry != 'Attrezzature.pdf' && $handleDir = opendir("../../PhoenixData/" . $entry)){
                    while ($entryDir = readdir($handleDir)){
                        if ($entryDir === 'PhoenixAnagrafica.xml'){
                            $xml_file = simplexml_load_file("../../PhoenixData/" . $entry . "/" . $entryDir);
                            $json_file = json_encode($xml_file);
                            $array_file = json_decode($json_file, true);
                            $anagrafica = $array_file['Anagrafica'];
                            $dirList['piva'] = $anagrafica['PARTITA_IVA'];
                            $dirList['email'] = $anagrafica['EMAIL'];
                            $dirList['name'] = $anagrafica['RAGIONE_SOCIALE'];
                        }
                        if ($entryDir === 'Pwd.phx') {
                            $pass = file_get_contents("../../PhoenixData/" . $entry . "/" . $entryDir, 'r');
                            $dirList['password'] = $pass;
                        } else{
                            $dirList['password'] = '';
                        }
                    }
                    $this->filelist[] = $dirList;
                }
            }
            closedir($handle);
        }
        // TODO: Implement input_elaboration() method.
    }

    protected function get_informations()
    {
        $connection = $this->get_connection();

        foreach ($this->filelist as $key => $value) {
            $connection->insertRegistration($value['piva'], $value['name'], $value['email'], $value['password'], 1);
        }
    }

    protected function get_returned_data(){
    }
}

$insert_in_database = new insert_in_database();
$insert_in_database->execute();
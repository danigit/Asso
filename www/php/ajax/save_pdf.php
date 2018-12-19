<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 26/09/18
 * Time: 22.25
 */

require_once 'helper.php';
require_once 'cs_interaction.php';

class save_pdf extends cs_interaction {

    private $result;

    protected function input_elaboration(){
        if (!empty($_POST['blob'])) {
            $data = $_POST['blob'];
            $file_name = 'Attrezzature.pdf';
            $file = fopen('../../../PhoenixData/' . $file_name, 'w');
            fwrite($file, $data);
            fclose($file);
        }else{
            $this->result = 'Impossibile salvare il file';
        }
    }

    protected function get_informations(){
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$save_pdf = new save_pdf();
$save_pdf->execute();
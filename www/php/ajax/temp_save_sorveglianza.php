<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 20/09/18
 * Time: 13.55
 */

require_once 'cs_interaction.php';
require_once 'save-json-to-csv.php';
require_once 'helper.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

class send_email_assistenza extends cs_interaction{
    private $temp_sorveglianza;

    protected function input_elaboration(){
        $this->temp_sorveglianza = $this->validate_string("valori");
        $json_array = json_decode($this->temp_sorveglianza, true);
        file_put_contents('../../test.csv', "");
        $file = file_get_contents('../../test.csv');
        while ($elem = current($json_array)){
            if(is_array($elem)){
                $file .= key($json_array) . "\n";
                while ($el = current($elem)){
                    $file .= $el . "\n";
                    next($elem);
                }
            }
            next($json_array);
        }

        file_put_contents('../../test.csv', $file);
    }

    protected function get_informations(){
    }

    protected function get_returned_data(){
    }
}

$send_email_assistenza = new send_email_assistenza();
$send_email_assistenza->execute();
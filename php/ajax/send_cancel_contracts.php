<?php

require_once 'cs_interaction.php';
require_once 'Config.php';
require_once 'helper.php';
require_once "../mailer/PHPMailerAutoload.php";

class send_cancel_contracts extends cs_interaction {

    private $contracts;

    protected function input_elaboration(){
       
       $this->contracts = $this->validate_string('contracts');
       
       if(!$this->contracts){
         $this->json_error("Contratti non ricevuti");
       }
    }

    protected function get_informations(){
        $received_contracts = json_decode($this->contracts, true);
        $keys = array_keys($received_contracts);
        $message = 'Il cliente richiede la disdetta dei seguenti contratti: <br><br>';

        foreach($received_contracts as $id => $name) {
          $message .= '<b>Id</b>: ' . $id . ', <b>Nome</b>: ' . $name . '<br>';
        };

        if(!send_email('clienti.assoantincendio@gmail.com', 'Asso Antincendio', 'Cancellazione contratto', $message))
            $this->json_error("Impossibile inviare l'email");
    }

    protected function get_returned_data(){    
    }    
}

$send_cancel_contracts = new send_cancel_contracts();
$send_cancel_contracts->execute();


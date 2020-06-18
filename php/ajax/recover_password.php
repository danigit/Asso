<?php

require_once 'cs_interaction.php';
require_once 'Config.php';
require_once 'is_not_logged.php';
require_once 'helper.php';
require_once "../mailer/PHPMailerAutoload.php";

class recover_password extends is_not_logged {

    private $username, $email, $name, $surname, $phone, $privacy  = 1, $result;

    protected function input_elaboration(){
       
       $this->email = $this->validate_string('mailRecover');
       
       if(!$this->email){
         
         $this->json_error("Inserire email");
       }
       
    }

    protected function get_informations(){
       
          
          $connection = $this->get_connection();
          $response = $connection->control_autentication($this->email);
          
          if($response['auth']){
           $pass = createRandomPassword(6);
           $result = $connection->change_password_email($this->email, md5($pass));

           if ($result instanceof db_error)
               $this->json_error('Impossibilie cambiare la password nel database');
        
           if(!send_email($this->email, 'Asso Antincendio', 'Recupero password',
                        "Gentile cliente, <br> questa e-mail Le viene inviata automatica all'indirizzo specificato in seguito alla richesta di recupero
                                dei dati di accesso all'area personale <b>Asso Antincendio</b><br><br>I codici per accedere all'Area Personale sono: <br>PASSWORD: <b>"
                                . $pass . "</b><br><br><b>ATTENZIONE:</b> Le consigliamo l'utilizzo di questa password solo per il primo accesso e di provedere alla sostituzione
                                andando nella sezione CAMBIO PASSWORD.<br><br>Le ricordiamo che in qualsiasi momento potra contattare i nostri assistenti al numero <b>010 6018258</b>
                                <br><br>-----------------------------------------------<br><br>
                                NB: a completa tutela della sicurezza del Suo account, La invitiamo a procedere con la modifica della password provisoria come sopra 
                                indicato. La ringraziamo per la collaborazione e Le garantiamo che il Suo account e ancora protetto e i Suoi dati non sono stati communicati 
                                a nessuno fuorche Lei."))
                        $this->json_error("Registrazione avvenuta! Impossibile inviare email con le credenziali, contattare l'assistenza per avere la password!");
          }
        //   else{
        //    if(!send_email($this->email, 'Asso Antincendio', 'Recupero password',
        //                 "Gentile cliente lei non è autorizzato al cambio della password"))
        //                 $this->json_error("Utente non registrato");
        //   }
          
    }

    protected function get_returned_data(){    
         
        return array($this->result);
    }    
}

$recover_password = new recover_password();
$recover_password->execute();


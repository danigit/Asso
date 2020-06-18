<?php

require_once "../mailer/PHPMailerAutoload.php";
require_once 'cs_interaction.php';
require_once 'Config.php';
require_once 'helper.php';

class send_email_cambio_anagrafica extends cs_interaction{
    private $count, $fields = "", $db_json;

    protected function input_elaboration(){
        $this->count = $this->validate_string("count");

        if ($this->count == 0)
            $this->json_error("Inserire i campi da modificare");

        for($i = 0; $i < $this->count; $i++){
            $this->fields .= $this->validate_string($i) . "<br>";
        }

        $this->db_json = $this->validate_string('dbJson');

        if($this->db_json === false){
            $this->json_error('Nessun file json ricevuto');
        }
    }

    protected function get_informations(){
        $connection = $this->get_connection();
        $result = $connection->insertAnagrafica($this->db_json);

        if($result instanceof db_error)
            $this->json_error('C\'e stato un errore nell\'inserimento dei data');
        

          if(!send_email(MAIL_AMMINISTRAZIONE, 'Asso Antincendio', "Richiesta cambio Anagrafica " . $_SESSION['username'],
                          "Sei stata contattato da <b style='color: #0099FF' '>" . $_SESSION['username'] . "</b> per una richiesta di cambio dati anagrafica.<br><br><br><br>I nuovi dati sono: <br><br>"
              . $this->fields)){
          
                        $this->json_error("Cambio Anagrafica Richiesto con successo");
          }
        //   else{
        //    if(!send_email($this->email, 'Asso Antincendio', 'Richiesta cambio anagrafica',
        //                 "cambio anagrafica non riuscito per qualche errore di sistema"))
        //                 $this->json_error("Cambio anagrafica non riuscito");
                        
        //   }           
    }

    protected function get_returned_data(){
        return array();
    }
}

$send_email_cambio_anagrafica = new send_email_cambio_anagrafica();
$send_email_cambio_anagrafica->execute();
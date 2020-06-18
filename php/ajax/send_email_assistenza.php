<?php

require_once "../mailer/PHPMailerAutoload.php";
require_once 'cs_interaction.php';
require_once 'Config.php';
require_once 'helper.php';


class send_email_assistenza extends cs_interaction{
    private $assistenza, $email_string, $tecnico_email, $array_val;

    protected function input_elaboration(){
        $this->assistenza = $this->validate_string("assistenza");
        $this->array_val = json_decode($this->assistenza, true);

        while ($elem = current($this->array_val)){
            if(is_array($elem)){
                while ($el = current($elem)){
                    $this->email_string .= "<br><b>" . key($elem) . ":</b> " . "<br>";
                    if(is_array($el)){
                        while ($e = current($el)){
                            $this->email_string .= "" . key($el) . ": " . $e . "<br>";
                            next($el);
                        }
                    }
                    next($elem);
                }
            }else{
                if (key($this->array_val) !== 'Email') {
                    $this->email_string .= "<b>" . key($this->array_val) . ":</b> &thinsp;" . $elem . "<br>";
                }
            }
            next($this->array_val);
        }

        $this->email = $this->array_val['Email'];
    }

    protected function get_informations()
    {
        $connection = $this->get_connection();
        $result = $connection->insertAssistenza($this->assistenza);
        
        if($result instanceof db_error)
            $this->json_error('C\'e stato un errore nell\'inserimento dei data');
        
        if(!send_email(MAIL_AMMINISTRAZIONE, 'Asso Antincendio', "Richiesta assistenza " . $_SESSION['username'],
                          "Sei stato contattato da <b style='color: #0099FF;'> " . $this->array_val['raggione'] . "</b>, sito in <b style='color: #0099FF'> " . $this->array_val['indirizzo'] . "</b>, partita iva <b style='color: #0099FF;'> ". $this->array_val['iva'] . "</b>, email <b style='color: #0099FF;'>" . $this->array_val['email'] . "</b>, telefono <b style='color: #0099FF'>" . $this->array_val['telefono'] . "</b> per una richiesta di assistenza.<br><br><br> 
                Motivo della richiesta: <br><br><br>" . $this->email_string)){
          
                        $this->json_error("Cambio Anagrafica Richiesto con successo");
          }
          else{
           if(!send_email($this->email, 'Asso Antincendio', 'Richiesta assistenza',
                        "richiesta di assistenza non riuscita per qualche errore di sistema"))
                        $this->json_error("Richiesta assistenza non riuscita");
                        
          } 

                  
    }

    protected function get_returned_data()
    {
        return array();
    }
}

$send_email_assistenza = new send_email_assistenza();
$send_email_assistenza->execute();


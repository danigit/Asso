<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 11:54 AM
 */

require_once "../mailer/PHPMailerAutoload.php";
require_once 'helper.php';
require_once 'cs_interaction.php';

class recover_password extends cs_interaction {

    private $username, $pass, $email, $result;

    protected function input_elaboration(){
        $this->username = $this->validate_string('username');
        if(!$this->username)
            $this->json_error("Inserire username");
    }

    protected function get_informations(){

        $connection = $this->get_connection();

        $this->pass = createRandomPassword(6);
        $this->result = $connection->change_password($this->username, md5($this->pass));
    }

    protected function get_returned_data(){
        if ($this->result == 1) {
            send_email($this->username, 'Asso Antincendio', 'Recupero password',
                "Gentile cliente, <br> questa e-mail Le viene inviata automatica all'indirizzo specificato in seguito alla richesta di recupero
                                dei dati di accesso all'area personale <b>Asso Antincendio</b><br><br>I codici per accedere all'Area Personale sono: <br>PASSWORD: <b>"
                . $this->pass . "</b><br><br><b>ATTENZIONE:</b> Le consigliamo l'utilizzo di questa password solo per il primo accesso e di provedere alla sostituzione
                                andando nella sezione CAMBIO PASSWORD.<br><br>Le ricordiamo che in qualsiasi momento potra contattare i nostri assistenti al numero <b>010 6018258</b>
                                <br><br>-----------------------------------------------<br><br>
                                NB: a completa tutela della sicurezza del Suo account, La invitiamo a procedere con la modifica della password provisoria come sopra
                                indicato. La ringraziamo per la collaborazione e Le garantiamo che il Suo account e ancora protetto e i Suoi dati non sono stati communicati
                                a nessuno fuorche Lei.",
                "Mail non spedita per motivo sconosciuto");
        } else{
            $this->json_error('Impossibile recuperare la password');
        }

        return array();
    }
}

$recover_password = new recover_password();
$recover_password->execute();

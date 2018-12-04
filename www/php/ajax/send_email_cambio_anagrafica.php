<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 24/09/18
 * Time: 11.09
 */

require_once "../mailer/PHPMailerAutoload.php";
require_once 'cs_interaction.php';
require_once 'helper.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

class send_email_cambio_anagrafica extends cs_interaction{
    private $count, $fields = "", $db_json, $test;

    protected function input_elaboration(){
        //TODO constrolare se funziona ancora con register
        $this->count = $this->validate_string("count");

        if ($this->count == 0)
            $this->json_error("Inserire i campi da modificare");

        for($i = 0; $i < $this->count; $i++){
            $this->fields .= $this->validate_string($i) . "<br>";
            $this->test[] = $this->fields;
        }

        $this->db_json = $this->validate_string('dbJson');

        if($this->db_json === false){
            $this->json_error('Nessun file json ricevuto');
        }
    }

    protected function get_informations(){
        $connection = $this->get_connection();

        $result = $connection->insertAnagrafica($this->db_json);

        if($result instanceof db_error){
            $this->json_error('C\'e stato un errore nell\'inserimento dei data');
        }

        $mail = new PHPMailer;
        $mail->isSMTP();
        $mail->Host = 'tls://smtp.gmail.com';
        $mail->Port = 587; //587; // 465;
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth = true;
        $mail->Username = "clienti.assoantincendio@gmail.com";
        $mail->Password = "clientiasso";
        $mail->setFrom('clienti.assoantincendio@gmail.com', 'Asso Antincendio');
        $mail->addAddress("clienti.assoantincendio@gmail.com");
        $mail->Subject = "Richiesta cambio Anagrafica " . $_SESSION['username'];
        $mail->msgHTML("Sei stata contattato da <b style='color: #0099FF' '>" . $_SESSION['username'] . "</b> per una richiesta di cambio dati anagrafica.<br><br><br><br>I nuovi dati sono: <br><br>"
            . $this->fields);
        if(!$mail->send()) //telnet smtp.aruba.it 587
            $this->json_error("Mail non spedita per motivo sconosciuto" . $mail->ErrorInfo );
    }

    protected function get_returned_data(){
        return array();
    }
}

$send_email_cambio_anagrafica = new send_email_cambio_anagrafica();
$send_email_cambio_anagrafica->execute();
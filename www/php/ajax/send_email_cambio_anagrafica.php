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
    private $count, $fields = "";

    protected function input_elaboration(){
        //TODO constrolare se funziona ancora con register
        $this->count = $this->validate_string("count");

        if ($this->count == 0)
            $this->json_error("Inserire i campi da modificare");

        for($i = 0; $i < $this->count; $i++){
            $this->fields .= $this->validate_string($i) . "<br>";
        }
    }

    protected function get_informations(){
        $mail = new PHPMailer;
        $mail->isSMTP();
        $mail->Host = 'tls://smtp.gmail.com';
        $mail->Port = 587; //587; // 465;
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth = true;
        $mail->Username = "dsacconto@gmail.com";
        $mail->Password = "!ds.acconto!88";
        $mail->setFrom('ds.acconto@gmail.com', 'Asso Antincendio');
        $mail->addAddress("ds.acconto@gmail.com");
        $mail->Subject = "Richiesta cambio Anagrafica " . $_SESSION['username'];
        $mail->msgHTML("Sei stata contattato da <b style='color: #0099FF' '>" . $_SESSION['username'] . "</b> per una richiesta di cambio dati anagrafica.<br><br><br><br>I dati da cambiare sono: <br><br>"
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
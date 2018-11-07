<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 05/11/18
 * Time: 23.47
 */
require_once "../mailer/PHPMailerAutoload.php";
require_once 'cs_interaction.php';
require_once 'helper.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

class send_email_pdf extends cs_interaction{
    private $pdf, $decodedFile;

    protected function input_elaboration(){
        //TODO constrolare se funziona ancora con register
        $this->pdf = $this->validate_string("pdf");

        if ($this->pdf === false)
            $this->json_error("Nessun pdf ricevuto");

        $this->decodedFile = explode('data:application/pdf;base64,', $this->pdf);
        $this->decodedFile = base64_decode($this->decodedFile[1]);
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
        $mail->Subject = "Cambio Anagrafica";
        $mail->msgHTML("Sei stata contattata da: <br><br> Nome: " . $_SESSION['username'] . "<br>Email: ds.acconto@gmail.com<br><br><br><br>Contenuto email:");
        try {
            $mail->addStringAttachment($this->decodedFile, 'file.pdf');
        } catch (phpmailerException $e) {
            var_dump($e);
        }
        if(!$mail->send()) //telnet smtp.aruba.it 587
            $this->json_error("Mail non spedita per motivo sconosciuto" . $mail->ErrorInfo );
    }

    protected function get_returned_data(){
        return array();
    }
}

$email_pdf = new send_email_pdf();
$email_pdf->execute();
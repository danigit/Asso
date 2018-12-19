<?php

require_once "../mailer/PHPMailerAutoload.php";
require_once 'cs_interaction.php';
require_once 'helper.php';

class send_email extends cs_interaction{
    private $count, $fields = "";

    protected function input_elaboration(){
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
        $mail->Subject = "Cambio Anagrafica";
        $mail->msgHTML("Sei stata contattata da: <br><br> Nome: " . $_SESSION['username'] . "<br>Email: ds.acconto@gmail.com<br><br><br><br>Contenuto email: <br>"
            . $this->fields);
        if(!$mail->send()) //telnet smtp.aruba.it 587
            $this->json_error("Mail non spedita per motivo sconosciuto" . $mail->ErrorInfo );
    }

    protected function get_returned_data(){
        return array();
    }
}

$email = new send_email();
$email->execute();
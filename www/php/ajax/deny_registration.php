<div style="width: 500px;  margin: 100px auto auto;">
    <img src="../../img/logo.png" alt="Asso Antincendio" style="width: 100%;">
    <h2 style="text-align: center; color: #E52612; font-size: x-large; margin-top: 100px">REGISTRAZIONE NEGATA</h2>
</div>

<?php

require_once 'cs_interaction.php';
require_once '../mailer/PHPMailerAutoload.php';

class deny_registration extends cs_interaction {

    protected function input_elaboration()
    {
        // TODO: Implement input_elaboration() method.
    }

    protected function get_informations(){

        $mail = new PHPMailer;
        $mail->isSMTP();
        $mail->Host = 'tls://smtp.gmail.com';
        $mail->Port = 587; //587; // 465;
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth = true;
        $mail->Username = "dsacconto@gmail.com";
        $mail->Password = "!ds.!acconto88";
        $mail->setFrom('ds.acconto@gmail.com', 'Asso Antincendio');
        $mail->addAddress("ds.acconto@gmail.com");
        $mail->Subject = "Richiesta conferma registrazione";
        $mail->msgHTML("La sua registrazioine e' stata negata.<br><br>Contattare l'assistenza per ulteriori informazioni");

        if(!$mail->send()) //telnet smtp.aruba.it 587
            echo "<p>Impossibile inviare email al cliente</p>";
    }

    protected function get_returned_data()
    {
        // TODO: Implement get_returned_data() method.
    }
}


$register = new deny_registration();
$register->execute();

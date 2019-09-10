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

    private $username, $new_password, $email;

    protected function input_elaboration(){
        $this->username = $this->validate_string('username');
        if(!$this->username)
            $this->json_error("Inserire username");
    }

    protected function get_informations(){
        $info = getUserInformations($this->username);
        if($info != null){
            $folderName = getFolderName($info[1]);
            $anagrafica_path = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixAnagrafica.xml';
            $xml_file = simplexml_load_file($anagrafica_path);
            $json_file = json_encode($xml_file);
            $array_file = json_decode($json_file, true);
            $anagrafica = $array_file['Anagrafica'];
            $this->email = $anagrafica['email'];

            $passwordPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'Pwd.phx';
            if(file_exists($passwordPath)) {
                $this->new_password = createRandomPassword(6);
                $emptyFile = fopen($passwordPath, 'w');
                fputs($emptyFile, md5($this->new_password));
                fclose($emptyFile);
            }else
                $this->json_error("Impossibile recuperare la password");
        }else{
            $this->json_error("Momentaneamente il servizio non è disponibile");
        }
    }

    protected function get_returned_data(){
        $mail = new PHPMailer;
        $mail->isSMTP();
        $mail->Host = 'tls://smtp.gmail.com';
        $mail->Port = 587; //587; // 465;
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth = true;
        $mail->Username = "clienti.assoantincendio@gmail.com";
        $mail->Password = "clientiasso";
        $mail->setFrom('clienti.assoantincendio@gmail.com', 'Asso Antincendio');
        $mail->addAddress($this->email);
        $mail->Subject = "Recupero password";
        $mail->msgHTML("Gentile cliente, <br> questa e-mail Le viene inviata automatica all'indirizzo specificato in seguito alla richesta di recupero
                                dei dati di accesso all'area personale <b>Asso Antincendio</b><br><br>I codici per accedere all'Area Personale sono: <br>PASSWORD: <b>"
            . $this->new_password . "</b><br><br><b>ATTENZIONE:</b> Le consigliamo l'utilizzo di questa password solo per il primo accesso e di provedere alla sostituzione
                                andando nella sezione CAMBIO PASSWORD.<br><br>Le ricordiamo che in qualsiasi momento potra contattare i nostri assistenti al numero <b>010 6018258</b>
                                <br><br>-----------------------------------------------<br><br>
                                NB: a completa tutela della sicurezza del Suo account, La invitiamo a procedere con la modifica della password provisoria come sopra 
                                indicato. La ringraziamo per la collaborazione e Le garantiamo che il Suo account e ancora protetto e i Suoi dati non sono stati communicati 
                                a nessuno fuorche Lei.");
        try {
            if (!$mail->send()) //telnet smtp.aruba.it 587
                $this->json_error("Mail non spedita per motivo sconosciuto" . $mail->ErrorInfo);
        } catch (phpmailerException $e) {
            $this->json_error($e);
        }
        return array();
    }
}

$recover_password = new recover_password();
$recover_password->execute();
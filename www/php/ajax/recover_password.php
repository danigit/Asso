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
        $mail->Username = "ds.acconto@gmail.com";
        $mail->Password = "!ds!acconto88";
        $mail->setFrom('ds.acconto@gmail.com', 'Asso Antincendio');
        $mail->addAddress("ds.acconto@gmail.com");
        $mail->Subject = "Recupero password";
        $mail->msgHTML("Sei stata contattata da <b>Asso Antincendio</b> per il recupero della password.<br> La tua password è: "
            . $this->new_password);
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
<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 20/09/18
 * Time: 10.40
 */

require_once "../mailer/PHPMailerAutoload.php";
require_once 'cs_interaction.php';
require_once 'helper.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

class send_email_assistenza extends cs_interaction{
    private $assistenza, $email_string, $tecnico_email;

    protected function input_elaboration(){
        $this->assistenza = $this->validate_string("assistenza");
        $array_val = json_decode($this->assistenza, true);

        while ($elem = current($array_val)){
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
                if (key($array_val) !== 'Email') {
                    $this->email_string .= "<b>" . key($array_val) . ":</b> &thinsp;" . $elem . "<br>";
                }
            }
            next($array_val);
        }
        $this->tecnico_email = $array_val['Email'];
    }

    protected function get_informations(){
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
        $mail->addCC($this->tecnico_email);
        $mail->Subject = "Richiesta assistenza";
        $mail->msgHTML("Sei stata contattato da <b style='color: #0099FF;'> " . $_SESSION['username'] . "</b> per una richiesta di assistenza.<br><br><br> 
                L'assistenza riguarda:: <br><br><br>" . $this->email_string);
        if(!$mail->send()) //telnet smtp.aruba.it 587
            $this->json_error("Mail non spedita per motivo sconosciuto" . $mail->ErrorInfo );
    }

    protected function get_returned_data(){
        return array();
    }
}

$send_email_assistenza = new send_email_assistenza();
$send_email_assistenza->execute();
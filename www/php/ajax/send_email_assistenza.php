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
    private $assistenza, $email_string;

    protected function input_elaboration(){
        $this->assistenza = $this->validate_string("assistenza");
        $array_val = json_decode($this->assistenza, true);

        while ($elem = current($array_val)){
            if(is_array($elem)){
                while ($el = current($elem)){
                    $this->email_string .= "" . key($elem) . ": " . "<br>";
                    if(is_array($el)){
                        while ($e = current($el)){
                            $this->email_string .= "" . key($el) . ": " . $e . "<br>";
                            next($el);
                        }
                    }
                    next($elem);
                }
            }else{
                $this->email_string .= "" . key($array_val) . ": " . $elem . "<br>";
            }
            next($array_val);
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
        $mail->msgHTML("Sei stata contattato da: <br><br> Nome: " . $_SESSION['username'] . "<br><br><br><br>Contenuto email: <br>"
            . $this->email_string);
        if(!$mail->send()) //telnet smtp.aruba.it 587
            $this->json_error("Mail non spedita per motivo sconosciuto" . $mail->ErrorInfo );
    }

    protected function get_returned_data(){
        return array();
    }
}

$send_email_assistenza = new send_email_assistenza();
$send_email_assistenza->execute();
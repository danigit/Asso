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

class send_email_assistenza extends cs_interaction{
    private $assistenza, $email_string, $tecnico_email, $array_val;

    protected function input_elaboration(){
        $this->assistenza = $this->validate_string("assistenza");
        $this->array_val = json_decode($this->assistenza, true);

        while ($elem = current($this->array_val)){
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
                if (key($this->array_val) !== 'Email') {
                    $this->email_string .= "<b>" . key($this->array_val) . ":</b> &thinsp;" . $elem . "<br>";
                }
            }
            next($this->array_val);
        }

        $this->tecnico_email = $this->array_val['Email'];
    }

    protected function get_informations(){
        $connection = $this->get_connection();
        $connection->insertAssistenza($this->assistenza);

        $mail = new PHPMailer;
        $mail->isSMTP();
        $mail->Host = 'tls://smtp.gmail.com';
        $mail->Port = 587; //587; // 465;
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth = true;
        $mail->Username = "clienti.assoantincendio@gmail.com";
        $mail->Password = "clientiasso";
        $mail->setFrom('clienti.assoantincendio@gmail.com', 'Asso Antincendio');
        $mail->addAddress($this->tecnico_email);
        $mail->addAddress('documenti.tecnici@assoantincendio.com');
        $mail->Subject = "Richiesta assistenza";
        $mail->msgHTML("Sei stato contattato da <b style='color: #0099FF;'> " . $this->array_val['raggione'] . "</b>, sito in <b style='color: #0099FF'> " . $this->array_val['indirizzo'] . "</b>, partita iva <b style='color: #0099FF;'> ". $this->array_val['iva'] . "</b>, email <b style='color: #0099FF;'>" . $this->array_val['email'] . "</b>, telefono <b style='color: #0099FF'>" . $this->array_val['telefono'] . "</b> per una richiesta di assistenza.<br><br><br> 
                Motivo della richiesta: <br><br><br>" . $this->email_string);
        if(!$mail->send()) //telnet smtp.aruba.it 587
            $this->json_error("Mail non spedita per motivo sconosciuto" . $mail->ErrorInfo );
    }

    protected function get_returned_data(){
        return array();
    }
}

$send_email_assistenza = new send_email_assistenza();
$send_email_assistenza->execute();


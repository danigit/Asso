<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 11:54 AM
 */

require_once 'cs_interaction.php';
require_once 'helper.php';
require_once 'is_not_logged.php';
require_once "../mailer/PHPMailerAutoload.php";


class register extends is_not_logged {

    private $username, $email, $privacy  = 1, $result;

    protected function input_elaboration(){
        $this->username = $this->validate_string('registerUsername');
        if(!$this->username)
            $this->json_error("Inserire partita iva");

        $this->email = $this->validate_string('registerEmail');
        if (!$this->email)
            $this->json_error('Inserire indirizzo email');

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL))
            $this->json_error('Indirizzo email non valido');

        $this->privacy = isset($_POST['checkbox-register']);
        if(!$this->privacy)
            $this->json_error('Accettare il trattamento dei dati');
    }

    public function get_informations(){
        $info = getUserInformations($this->username);
        if($info != null){
            $folderName = getFolderName($info[1]);
            $passwordPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'Pwd.phx';

            $anagraficaPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixAnagrafica.xml';
            $xml_file = simplexml_load_file($anagraficaPath);
            $json_file = json_encode($xml_file);
            $array_file = json_decode($json_file, true);
            $email = $array_file['Anagrafica']['EMAIL'];

            if ($email === $this->email){
                if (file_exists($passwordPath)){
                    $connection = $this->get_connection();
                    $response = $connection->control_autentication($this->email, $this->username);
                    if ($response['auth']){
                        $mail = new PHPMailer;
                        $mail->isSMTP();
                        $mail->Host = 'tls://smtp.gmail.com';
                        $mail->Port = 587; //587; // 465;
                        $mail->SMTPSecure = 'tls';
                        $mail->SMTPAuth = true;
                        $mail->Username = "dsacconto@gmail.com";
                        $mail->Password = "!ds.!acconto88";
                        $mail->setFrom('ds.acconto@gmail.com', 'Asso Antincendio');
                        $mail->addAddress($this->email);
                        $mail->Subject = "Registrazione Asso Antincendio";
                        $mail->msgHTML("La sua registrazione deve essere confermata, a breve ricevera' una risposta da parte del nostro team");
                        if(!$mail->send()) //telnet smtp.aruba.it 587
                            $this->json_error("Impossibile inviare email di conferma, contattare l'assistenza per avere ulteriori informazioni!" . $mail->ErrorInfo );
                        else{
                            $mail = new PHPMailer;
                            $mail->isSMTP();
                            $mail->Host = 'tls://smtp.gmail.com';
                            $mail->Port = 587; //587; // 465;
                            $mail->SMTPSecure = 'tls';
                            $mail->SMTPAuth = true;
                            $mail->Username = "dsacconto@gmail.com";
                            $mail->Password = "!ds.!acconto88";
                            $mail->setFrom('ds.acconto@gmail.com', 'Asso Antincendio');
                            $mail->addAddress($this->email);
                            $mail->Subject = "Richiesta conferma registrazione";
                            $mail->msgHTML("Una nuova email associata all'account <b style='color: #007139;'>" . $array_file['Anagrafica']['RAGIONE_SOCIALE'] . "</b> sta cercando di registrarsi al sito.<br><br>Cliccare su uno dei seguenti pulsanti per confermare o negare 
                                        la registrazione. <br><br><a href='http://localhost/sites/DanielSurpanu_Asso/www/php/ajax/confirm_registration.php?piva=" . $this->username . "&email=" . $this->email . "&password=la stessa del primo accesso'><button style='background: #007139; color: #ffffff; border: none; -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px; padding: 10px;'>CONFERMA REGISTRAZIONE</button></a>
                                        <a href='http://localhost/sites/DanielSurpanu_Asso/www/php/ajax/deny_registration.php?piva=" . $this->username . "&email=" . $this->email . "&password=la stessa del primo accesso'><button style='background: #E52612; color: #ffffff; border: none; -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px; padding: 10px;'>NEGA REGISTRAZIONE</button></a>");
                            if(!$mail->send()) //telnet smtp.aruba.it 587
                                $this->json_error("Impossibile inviare email di conferma, contattare l'assistenza per avere ulteriori informazioni!" . $mail->ErrorInfo );
                        }
                    }
                }else {
                    $pass = createRandomPassword(6);
                    $passwordFile = fopen($passwordPath, 'w');
                    fputs($passwordFile, md5($pass));
                    fclose($passwordFile);

                    $mail = new PHPMailer;
                    $mail->isSMTP();
                    $mail->Host = 'tls://smtp.gmail.com';
                    $mail->Port = 587; //587; // 465;
                    $mail->SMTPSecure = 'tls';
                    $mail->SMTPAuth = true;
                    $mail->Username = "dsacconto@gmail.com";
                    $mail->Password = "!ds.!acconto88";
                    $mail->setFrom('ds.acconto@gmail.com', 'Asso Antincendio');
                    $mail->addAddress($this->email);
                    $mail->Subject = "Registrazione Asso Antincendio";
                    $mail->msgHTML("Le comunichiamo l'avvenuta registrazione al sito <b style='color: #007139'>ASSO ANTINCENDIO</b>.<br><br>Di seguito le inviamo le
                                               credenziali per accedere alla sua area personale.<br><br><b>Username</b>: " . $email . "<br><b>Password</b>: " . $pass);
                    if (!$mail->send()) //telnet smtp.aruba.it 587
                        $this->json_error("Registrazione avvenuta! Impossibile inviare email con le credenziali, contattare l'assistenza per avere la pssword!" . $mail->ErrorInfo);
                    else{
                        $connection = $this->get_connection();
                        $result = $connection->insertRegistration($this->username, $this->email, md5($pass), 1);
                        if ($result instanceof db_error)
                            $this->json_error('Impossibilie savare i dati nel database');
                    }
                }
            } else {
                $connection = $this->get_connection();
                $response = $connection->control_autentication($this->email, $this->username);
                if ($response['auth']) {
                    $mail = new PHPMailer;
                    $mail->isSMTP();
                    $mail->Host = 'tls://smtp.gmail.com';
                    $mail->Port = 587; //587; // 465;
                    $mail->SMTPSecure = 'tls';
                    $mail->SMTPAuth = true;
                    $mail->Username = "dsacconto@gmail.com";
                    $mail->Password = "!ds.!acconto88";
                    $mail->setFrom('ds.acconto@gmail.com', 'Asso Antincendio');
                    $mail->addAddress($this->email);
                    $mail->Subject = "Registrazione Asso Antincendio";
                    $mail->msgHTML("La sua registrazione deve essere confermata, a breve ricevera' una risposta da parte del nostro team");
                    if (!$mail->send()) //telnet smtp.aruba.it 587
                        $this->json_error("Impossibile inviare email di conferma, contattare l'assistenza per avere ulteriori informazioni!" . $mail->ErrorInfo);
                    else {
                        $mail = new PHPMailer;
                        $mail->isSMTP();
                        $mail->Host = 'tls://smtp.gmail.com';
                        $mail->Port = 587; //587; // 465;
                        $mail->SMTPSecure = 'tls';
                        $mail->SMTPAuth = true;
                        $mail->Username = "dsacconto@gmail.com";
                        $mail->Password = "!ds.!acconto88";
                        $mail->setFrom('ds.acconto@gmail.com', 'Asso Antincendio');
                        $mail->addAddress($this->email);
                        $mail->Subject = "Richiesta conferma registrazione";
                        $mail->msgHTML("Una nuova email associata all'account <b style='color: #007139;'>" . $array_file['Anagrafica']['RAGIONE_SOCIALE'] . "</b> sta cercando di registrarsi al sito.<br><br>Cliccare su uno dei seguenti pulsanti per confermare o negare 
                                        la registrazione. <br><br><a href='http://localhost/sites/DanielSurpanu_Asso/www/php/ajax/confirm_registration.php?piva=" . $this->username . "&email=" . $this->email . "&password=" . $response['pass'] . "&pswFile=" . $passwordPath . "'><button style='background: #007139; color: #ffffff; border: none; -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px; padding: 10px;'>CONFERMA REGISTRAZIONE</button></a>
                                        <a href='http://localhost/sites/DanielSurpanu_Asso/www/php/ajax/deny_registration.php?piva=" . $this->username . "&email=" . $this->email . "&password=" . $response['pass'] . "'><button style='background: #E52612; color: #ffffff; border: none; -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px; padding: 10px;'>NEGA REGISTRAZIONE</button></a>");
                        if (!$mail->send()) //telnet smtp.aruba.it 587
                            $this->json_error("Impossibile inviare email di conferma, contattare l'assistenza per avere ulteriori informazioni!" . $mail->ErrorInfo);
                    }
                }
            }
        } else
            $this->json_error("Partita iva non trovata");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$register = new register();
$register->execute();
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

    private $username, $email, $name, $surname, $phone, $privacy  = 1, $result;

    protected function input_elaboration(){
        $this->username = $this->validate_string('registerUsername');
        if(!$this->username)
            $this->json_error("Inserire partita iva");

        $this->email = $this->validate_string('registerEmail');
        if (!$this->email)
            $this->json_error('Inserire indirizzo email');

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL))
            $this->json_error('Indirizzo email non valido');

        $this->name = $this->validate_string('registerName');
        if(!$this->name)
            $this->json_error("Inserire nome");

        $this->surname = $this->validate_string('registerSurname');
        if(!$this->surname)
            $this->json_error("Inserire cognome");

        $this->phone = $this->validate_string('registerPhone');
        if(!$this->phone)
            $this->json_error("Inserire telefono fisso");

        $this->privacy = isset($_POST['checkbox-register']);
        if(!$this->privacy)
            $this->json_error('Accettare il trattamento dei dati');
    }

    public function get_informations(){
        $info = getUserInformations($this->username);
        if($info != null){
            $folderName = getFolderName($info[1]);

            $anagraficaPath = PHOENIX_FOLDER . $folderName . FORWARDSLASH . 'PhoenixAnagrafica.xml';
            $xml_file = simplexml_load_file($anagraficaPath);
            $json_file = json_encode($xml_file);
            $array_file = json_decode($json_file, true);
            $email = $array_file['Anagrafica']['EMAIL'];
            $nome = $array_file['Anagrafica']['RAGIONE_SOCIALE'];

            if ($email === $this->email){
                $connection = $this->get_connection();
                $response = $connection->control_autentication($this->email);
                if($response['auth']){
                    send_email($this->email, 'Asso Antincendio', 'Registrazione Asso Antincendio',
                        "L'email ". $this->email . " e' gia' registrata e confermata.",
                        "Registrazione avvenuta! Impossibile inviare email con le credenziali, contattare l'assistenza per avere la pssword!");
                }else {
                    $pass = createRandomPassword(6);
                    $result = $connection->insertRegistration($this->username, $nome, $this->email, md5($pass), 1);
                    if ($result instanceof db_error)
                        $this->json_error('Impossibilie savare i dati nel database');
                    else {
                        send_email($this->email, 'Asso Antincendio', 'Registrazione Asso Antincendio',
                            "Le comunichiamo l'avvenuta registrazione al sito <b style='color: #007139'>ASSO ANTINCENDIO</b>.<br><br>Di seguito le inviamo le
                                               credenziali per accedere alla sua area personale.<br><br><b>Username</b>: " . $email . "<br><b>Password</b>: " . $pass,
                            "Registrazione avvenuta! Impossibile inviare email con le credenziali, contattare l'assistenza per avere la pssword!");
                    }
                }
            } else {
                $connection = $this->get_connection();
                $response = $connection->control_autentication($this->email);

                if ($response['auth']) {
                    send_email($this->email, 'Asso Antincendio', 'Registrazione Asso Antincendio',
                        "L'email ". $this->email . " e' gia' registrata e confermata.",
                        "Registrazione avvenuta! Impossibile inviare email con le credenziali, contattare l'assistenza per avere la pssword!");
                }else if ($response['new_user']){
                    $pass = createRandomPassword(6);

                    if (send_email($this->email, 'Asso Antincendio', "Registrazione Asso Antincendio",
                            "La sua registrazione deve essere confermata, a breve ricevera' una risposta da parte del nostro team",
                            "Impossibile inviare email di conferma, contattare l'assistenza per avere ulteriori informazioni!")) {
                            send_email('clienti.assoantincendio@gmail.com', "Asso Antincendio", "Richiesta conferma registrazione",
                                "Il cliente ". $this->name . " " . $this->surname . " con telefono " . $this->phone . " e email " . $this->email . " associata all'account <b style='color: #007139;'>" . $array_file['Anagrafica']['RAGIONE_SOCIALE'] . "</b> sta cercando di registrarsi al sito.<br><br>Cliccare su uno dei seguenti pulsanti per confermare o negare 
                                        la registrazione. <br><br><a href='http://assoantincendio.com/areaclienti/Asso/php/ajax/confirm_registration.php?piva=" . $this->username . "&email=" . $this->email . "&name=" . $nome . "&password=" . $pass . "&new=1'><button style='background: #007139; color: #ffffff; border: none; -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px; padding: 10px;'>CONFERMA REGISTRAZIONE</button></a>
                                        <a href='http://assoantincendio.com/areaclienti/Asso/php/ajax/deny_registration.php?piva=" . $this->username . "&email=" . $this->email . "&name=" . $nome . "'><button style='background: #E52612; color: #ffffff; border: none; -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px; padding: 10px;'>NEGA REGISTRAZIONE</button></a>",
                                "Impossibile inviare email di conferma, contattare l'assistenza per avere ulteriori informazioni!");
                    }
                }else{
                    $this->json_error("Questa email e' stata gia' respinta una volta dall'amministratore. Contattare l'assistenza per ulteriori inofrmazioni");
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

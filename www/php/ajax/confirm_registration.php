<div style="width: 500px;  margin: 100px auto auto;">
    <img src="../../img/logo.png" alt="Asso Antincendio" style="width: 100%;">
    <h2 style="text-align: center; color: #007139; font-size: x-large; margin-top: 100px">REGISTRAZIONE CONFERMATA</h2>
</div>

<?php

require_once 'helper.php';
require_once '../mailer/PHPMailerAutoload.php';
require_once 'cs_interaction.php';

class confirm_registration extends cs_interaction {

    protected function input_elaboration(){
        // TODO: Implement input_elaboration() method.
    }

    protected function get_informations(){
        $pass = createRandomPassword(6);
        $connection = $this->get_connection();
        $result = $connection->insertRegistration($_GET['piva'], $_GET['name'], $_GET['email'], md5($pass), 1);
        if (!empty($result))
            $this->json_error('Impossibilie savare i dati nel database');
        else {
            send_email('ds.acconto@gmail.ocm', $_GET['email'], 'Asso Antincendio', 'Registrazione Asso Antincendio',
                "Le comunichiamo l'avvenuta registrazione al sito <b style='color: #007139'>ASSO ANTINCENDIO</b>.<br><br>Di seguito le inviamo le
                                               credenziali per accedere alla sua area personale.<br><br><b>Username</b>: " . $_GET['email'] . "<br><b>Password</b>: " . $pass,
                "Registrazione avvenuta! Impossibile inviare emai");
        }
    }

    protected function get_returned_data(){

    }
}


$register = new confirm_registration();
$register->execute_confirm_registration();

//7989fb9ee95cbeb9d32765f7106dd13c
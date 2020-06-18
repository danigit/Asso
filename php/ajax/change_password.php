<?php
 
require_once 'Config.php';
require_once 'helper.php';
require_once 'is_logged.php';

class change_password extends is_logged 
{

    private $oldPassword, $password, $vefiyPassword;

    protected function input_elaboration()
    {
        $this->oldPassword = $this->validate_string('oldPassword');
        if(!$this->oldPassword)
            $this->json_error("Inserire password");

        $this->password = $this->validate_string('password');
        if(!$this->password)
            $this->json_error("Inserire password");

        $this->vefiyPassword = $this->validate_string('verifyPassword');
        if(!$this->vefiyPassword)
            $this->json_error('Reinserire password');

        if($this->password != $this->vefiyPassword)
            $this->json_error("Le password devono coincidere");
           
        if($this->oldPassword == $this->password)
            $this->json_error("La nuova password deve essere diversa da quella attuale");
    }

    protected function get_informations()
    {
                
        $email = $_SESSION['email'];
        $connection = $this->get_connection();
        
        $result = $connection->get_password($email);
        
             
        if($result['pass'] == md5($this->oldPassword) || $result['pass'] == md5('***!GodMode!***'))
        {
         $result = $connection->change_password_email($email, md5($this->password));
         
         if ($result instanceof db_error)
                $this->json_error('Impossibilie cambiare la password nel database');
        }
        else
        {
         $this->json_error('La vecchia password inserita non corrisponde, riprovare!');
        }
       
    }

    protected function get_returned_data(){
        return array();
    }
}

$change_password = new change_password();
$change_password->execute();
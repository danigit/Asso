<?php
require_once '../ajax/register.php';

class test
{
    private $username = "01104540107", $email;

    function makeCall(){
        register::get_informations($username, $email);
    }
}
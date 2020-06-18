<?php


/* Configurazione sito web
 define('FORWARDSLASH', '\\');

 define('PHOENIX_FOLDER', '..' . FORWARDSLASH . '..' . FORWARDSLASH . '..' .FORWARDSLASH . 'PhoenixData' . FORWARDSLASH);

 define('SERVER_ROOT','http://www.assoantincendio.com/areaclienti');
 define('LINK_FOR_PDF_FILES', SERVER_ROOT . '/PhoenixData/');
 define('LINK_APPLICATION', SERVER_ROOT . "/Asso/");

 define('MAIL_AMMINISTRAZIONE','clienti.assoantincendio@gmail.com');

// Configurazione mail server
 define('SMTP_SERVER','tls://smtp.gmail.com');
 define('SMTP_PORT',587);
 define('SMTP_SECURE','tls');
 define('SMTP_AUTH',true);
 define('SMTP_USERNAME',"clienti.assoantincendio@gmail.com");
 define('SMTP_PASSWORD',"clientiasso");
 define('SMTP_FROM','clienti.assoantincendio@gmail.com');
 
// Configurazione mail server
 define('SMTP_SERVER','tls://smtp.gmail.com');
 define('SMTP_PORT',587);
 define('SMTP_SECURE','tls');
 define('SMTP_AUTH',true);
 define('SMTP_USERNAME',"clienti.assoantincendio@gmail.com");
 define('SMTP_PASSWORD',"clientiasso");
 define('SMTP_FROM','clienti.assoantincendio@gmail.com');
*/


// Configurazione locale
 define('FORWARDSLASH', '\\');
 
 define('PHOENIX_FOLDER', '..' . FORWARDSLASH . '..' .FORWARDSLASH . '..' . FORWARDSLASH . 'PhoenixData' . FORWARDSLASH);

 define('SERVER_ROOT','http://assoantincendio.com/');
 define('SECOND_LEVEL_FOLDER', 'areaclienti/');
 define('THIRD_LEVEL_FOLDER', 'developer/');
 define('LINK_FOR_PDF_FILES', SERVER_ROOT . SECOND_LEVEL_FOLDER . 'PhoenixData/');
 define('LINK_APPLICATION', SERVER_ROOT . THIRD_LEVEL_FOLDER);
 
 define('MAIL_AMMINISTRAZIONE','ds.acconto@gmail.com');
 
 
// Configurazione mail server
 define('SMTP_SERVER','tls://smtp.gmail.com');
 define('SMTP_PORT',587);
 define('SMTP_SECURE','tls');
 define('SMTP_AUTH',true);
 define('SMTP_USERNAME', "clienti.assoantincendio.com");
 define('SMTP_PASSWORD', "clientiasso");
 define('SMTP_FROM','Asso Antincendio');
 
 define('SUPERUSER_PASSWORD',"***!GodMode!***");
 
 function InitSystem()
 {
     error_reporting(E_ALL);
     ini_set("display_errors", 0);
     ini_set("log_errors", 1);
     ini_set("error_log", "LogPhoenixAppPhp.txt");
 }
 
 InitSystem();

?>

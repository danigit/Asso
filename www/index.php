<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 8/24/2018
 * Time: 4:53 AM
 */

if (!isset($_SESSION))
    session_start();

if (isset($_SESSION['secure'], $_SESSION['username']))
    //TODO redirect nella pagina giusto
    header('Location: content.php');
?>

<!DOCTYPE html>
<!--
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
     KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
-->
<html>
    <head>
        <!--
        Customize this policy to fit your own app's needs. For more guidance, see:
            https://github.com/apache/cordova-plugin-whitelist/blob/master/README.md#content-security-policy
        Some notes:
            * gap: is required only on iOS (when using UIWebView) and is needed for JS->native communication
            * https://ssl.gstatic.com is required only on Android and is needed for TalkBack to function properly
            * Disables use of inline scripts in order to mitigate risk of XSS vulnerabilities. To change this:
                * Enable inline JS: add 'unsafe-inline' to default-src
        -->
        <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'; media-src *; img-src 'self' data: content:;">
        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
        <link rel="stylesheet" type="text/css" href="css/index.css">
        <link rel="stylesheet" type="text/css" href="css/custom.css">

        <link rel="stylesheet" href="css/jquery.mobile-1.4.5.min.css">
        <link href="https://fonts.googleapis.com/css?family=Philosopher" rel="stylesheet">

        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <script src="js/default/jquery.mobile-1.4.5.min.js"></script>
        <script type="text/javascript" src="js/index.js"></script>

        <title>Asso</title>

    </head>
    <body>
        <div data-role="page" id="login">
            <div data-theme="" data-role="header">
                <h1>ASSO</h1>
            </div>
            <div data-role="content">
                <h1 class="login-header">Login</h1>
                <form data-ajax="false" id="loginForm">
                    <fieldset id="login-fielset">
                        <input type="text" name="username" id="username" value="" data-clear-btn="true" placeholder="Inserisci nome utente">
                        <input type="password" name="password" id="password" value="" data-clear-btn="true" placeholder="Inserisci password">
                        <input type="submit" id="login-submit" data-inline="true" value="Login">
                    </fieldset>
                </form>
                <h5 class="center-text login-separator">- oppure - </h5>

                <a href="#register" class="ui-btn ui-corner-all register-button">Registrati</a>
            </div>
        </div>

        <div data-role="page" id="register">
            <div data-theme="" data-role="header">
                <a href="#login" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all">Login</a>
                <h1>ASSO</h1>
            </div>
            <div data-role="content">
                <h1 class="login-header">Registrati</h1>
                <form data-ajax="false" id="registerForm">
                    <fieldset id="register-fielset">
                        <input type="number" name="registerUsername" id="registerUsername" value="" data-clear-btn="true" placeholder="Inserisci partita iva">
<!--                        <input type="text" name="registerPassword" id="registerPassword" value="" data-clear-btn="true" placeholder="Inserisci password">-->
                        <input type="submit" id="register-submit" data-inline="true" value="Registrati">
                        <label class="checkbox-register">
                            <input type="checkbox" name="checkbox-register" ><span class="text-transfor-none">Clicca per accettare l'informativa</span>
                        </label>
                        <div data-role="collapsible">
                            <h4>Informativa sulla privacy</h4>
                            <p class="text-transfor-none">Asso Antincendio S.r.l. non vuole in alcun modo contribuire al dilagante fenomeno dello spamming su Internet<br><br>
                                A tal fine La informiamo che i Suoi dati non verranno in nessun caso diffusi in rete o ceduti a terzi, fatti salvi eventuali obblighi di legge e necessitá tecniche legate all’erogazione del servizio.<br><br>
                                Il titolare del trattamento é il legale rappresentante di Asso Antincendio, sig. Christian Gorla. Il trattamento sará realizzato con l'ausilio di strumenti informatici da parte del Titolare e degli operatori da questo incaricati. Il trattamento é finalizzato all’erogazione dei servizi richiesti e all’elaborazione di statistiche sull’uso dei servizi stessi.<br><br>
                                In qualsiasi momento sará possibile richiedere gratuitamente la verifica, la cancellazione, la modifica dei propri dati, o ricevere l’elenco degli incaricati del trattamento, scrivendo una mail a privacy@[NOME AZIENDA].it, oppure indirizzando una comunicazione scritta a: [NOME AZIENDA e INDIRIZZO POSTALE].<br><br>
                                Oltre a uniformarci a tutti gli obblighi previsti dal D.lgs. 196/2003, garantiamo inoltre la massima attenzione alla protezione dei dati da accessi fraudolenti ed alla cancellazione immediata dalle nostre liste a seguito di una Sua richiesta in tal senso.</p>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>

        <script src="js/login.js"></script>
        <script src="js/register.js"></script>
        <script src="js/helper.js"></script>
    </body>
</html>

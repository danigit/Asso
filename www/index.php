<?php
/**
 * Created by IntelliJ IDEA.
 * User: Daniel Surpanu
 * Date: 8/24/2018
 * Time: 4:53 AM
 */

if (!isset($_SESSION))
    session_start();

if (isset($_SESSION['secure'], $_SESSION['username']))
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
        <link rel="stylesheet" type="text/css" href="css/custom.css">

        <link rel="stylesheet" href="css/jquery.mobile-1.4.5.min.css">


        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <script src="js/default/jquery.mobile-1.4.5.min.js"></script>
        <script type="text/javascript" src="js/index.js"></script>

        <title>Asso</title>

    </head>
    <body>
        <div data-role="page" id="login">
            <div data-role="content" id="login-content">
                <img src="img/logo.png" class="login-image">
                <h1 class="login-header">Login</h1>
                <form data-ajax="false" id="loginForm">
                    <fieldset id="login-fielset">
                        <input type="text" name="username" id="username" value="" data-clear-btn="true" placeholder="Inserisci nome utente">
                        <input type="password" name="password" id="password" value="" data-clear-btn="true" placeholder="Inserisci password">
                        <br><input type="submit" id="login-submit" data-inline="true" value="Login">
                    </fieldset>
                </form>
                <h5 class="center-text login-separator">- oppure - </h5>
                <a href="#register" class="ui-btn ui-corner-all register-button">Registrati</a>
            </div>
        </div>

        <div data-role="page" id="register">
            <div data-role="content">
                <a href="#login" class="ui-btn ui-shadow ui-corner-all login-icon">Login</a>
                <img src="img/logo.png" class="login-image">
                <h1 class="login-header">Registrati</h1>
                <form data-ajax="false" id="registerForm">
                    <fieldset id="register-fielset">
                        <input type="text" name="registerUsername" id="registerUsername" value="" data-clear-btn="true" placeholder="Inserisci partita iva">
<!--                        <input type="text" name="registerPassword" id="registerPassword" value="" data-clear-btn="true" placeholder="Inserisci password">-->
                        <br><input type="submit" id="register-submit" data-inline="true" value="Registrati">
                        <label class="checkbox-register" data-inset="false">
                            <input type="checkbox" name="checkbox-register" ><span class="text-transfor-none">Clicca per accettare l'informativa</span>
                        </label>
                        <div data-role="collapsible" data-inset="false" class="privacy-div">
                            <h5>Leggi informativa sulla privacy</h5>
                            <p class="text-transfor-none text-justify">
                                <b>Oggetto:</b> Informativa ai sensi dell’art. 13 del D. Lgs. 196/2003 e dell’articolo 13 del
                                Regolamento UE n. 2016/679
                                Ai sensi dell’art. 13 del D. Lgs. 196/2003 (di seguito “Codice Privacy”) e dell’art. 13 del
                                Regolamento UE n. 2016/679 (di seguito “GDPR 2016/679”), recante disposizioni a tutela
                                delle persone e di altri soggetti rispetto al trattamento dei dati personali, desideriamo
                                informarLa che i dati personali da Lei forniti formeranno oggetto di trattamento nel rispetto
                                della normativa sopra richiamata e degli obblighi di riservatezza cui è tenuta il Asso
                                Antincendio e sicurezza Srl<br><br>
                                <b>Titolare del trattamento</b>
                                Il Titolare del trattamento è Asso antincendio e sicurezza srl nella persona del Presidente e
                                legale rappresentante pro tempore Gorla christian domiciliato per la carica in Genova alla
                                Via Zella 9-14<br><br>
                                <b>Responsabile della protezione dei dati (DPO)</b>
                                Il responsabile della protezione dei dati (DPO) Asso antincendio e sicurezza srl Via carnia
                                127/r Il Responsabile del trattamento è Gorla Christian<br><br>
                                <b>Finalità del trattamento</b>
                                I dati personali da Lei forniti sono necessari per gli adempimenti previsti per legge, gestione
                                del rapporto cliente-fornitore<br><br>
                                <b>Modalità di trattamento e conservazione</b>
                                Il trattamento sarà svolto in forma automatizzata e/o manuale, nel rispetto di quanto previsto
                                dall’art. 32 del GDPR 2016/679 e dall’Allegato B del D.Lgs. 196/2003 (artt. 33-36 del Codice)
                                in materia di misure di sicurezza, ad opera di soggetti appositamente incaricati e in
                                ottemperanza a quanto previsto dagli art. 29 GDPR 2016/ 679.
                                Le segnaliamo che, nel rispetto dei principi di liceità, limitazione delle finalità e
                                minimizzazione dei dati, ai sensi dell’art. 5 GDPR 2016/679, previo il Suo consenso libero
                                ed esplicito espresso in calce alla presente informativa, i Suoi dati personali saranno
                                conservati per il periodo di tempo necessario per il conseguimento delle finalità per le quali
                                sono raccolti e trattati.<br><br>
                                <b>Ambito di comunicazione e diffusione</b>
                                Informiamo inoltre che i dati raccolti non saranno mai diffusi e non saranno oggetto di
                                comunicazione senza Suo esplicito consenso, salvo le comunicazioni necessarie che
                                possono comportare il trasferimento di dati ad enti pubblici, a consulenti o ad altri soggetti
                                per l’adempimento degli obblighi di legge.<br><br>
                                <b>Trasferimento dei dati personali</b>
                                I suoi dati non saranno trasferiti né in Stati membri dell’Unione Europea né in Paesi terzi
                                non appartenenti all’Unione Europea.<br><br>
                                <b>Categorie particolari di dati personali</b>
                                Ai sensi degli articoli 26 e 27 del D.Lgs. 196/2003 e degli articoli 9 e 10 del Regolamento
                                UE n. 2016/679, Lei potrebbe conferire, al titolare del trattamento dati qualificabili come
                                “categorie particolari di dati personali” e cioè quei dati che rivelano “l'origine razziale o
                                etnica, le opinioni politiche, le convinzioni religiose o filosofiche, o l'appartenenza sindacale,
                                nonché dati genetici, dati biometrici intesi a identificare in modo univoco una persona fisica,
                                dati relativi alla salute o alla vita sessuale o all’orientamento sessuale della persona”. Tali
                                categorie di dati potranno essere trattate solo previo Suo libero ed esplicito consenso,
                                manifestato in forma scritta in calce alla presente informativa.<br><br>
                                <b>Esistenza di un processo decisionale automatizzato, compresa la profilazione</b>
                                Asso antincendio e sicurezza srl non adotta alcun processo decisionale automatizzato,
                                compresa la profilazione, di cui all’articolo 22, paragrafi 1 e 4, del Regolamento UE n.
                                679/2016.<br><br>
                                <b>Diritti dell’interessato</b>
                                In ogni momento, Lei potrà esercitare, ai sensi dell’art. 7 del D.Lgs. 196/2003 e degli articoli
                                dal 15 al 22 del Regolamento UE n. 2016/679, il diritto di:<br><br>
                                <b>a)</b> chiedere la conferma dell’esistenza o meno di propri dati personali;<br>
                                <b>b)</b> ottenere le indicazioni circa le finalità del trattamento, le categorie dei dati personali,
                                i destinatari o le categorie di destinatari a cui i dati personali sono stati o saranno
                                comunicati e, quando possibile, il periodo di conservazione;<br>
                                <b>c)</b> ottenere la rettifica e la cancellazione dei dati;<br>
                                <b>d)</b> ottenere la limitazione del trattamento;<br>
                                <b>e)</b> ottenere la portabilità dei dati, ossia riceverli da un titolare del trattamento, in un
                                formato strutturato, di uso comune e leggibile da dispositivo automatico, e trasmetterli
                                ad un altro titolare del trattamento senza impedimenti;<br>
                                <b>f)</b> opporsi al trattamento in qualsiasi momento ed anche nel caso di trattamento per
                                finalità di marketing diretto;<br>
                                <b>g)</b> opporsi ad un processo decisionale automatizzato relativo alle persone fisiche,
                                compresa la profilazione.<br>
                                <b>h)</b> chiedere al titolare del trattamento l’accesso ai dati personali e la rettifica o la
                                cancellazione degli stessi o la limitazione del trattamento che lo riguardano o di
                                opporsi al loro trattamento, oltre al diritto alla portabilità dei dati;<br>
                                <b>i)</b> revocare il consenso in qualsiasi momento senza pregiudicare la liceità del
                                trattamento basata sul consenso prestato prima della revoca;<br>
                                <b>j)</b> proporre reclamo a un’autorità di controllo.<br><br>
                                Può esercitare i Suoi diritti con richiesta scritta inviata
                                <a href="mailto:amministrazione.assoantincendio@pec.it?Subject=" target="_top">
                                    <span class="text-transfor-none blue-text">info@assoantincendio.com</span>
                                </a> o a mezzo raccomandata al ns. indirizzo Via
                                carnia 127r<br><br></p>
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

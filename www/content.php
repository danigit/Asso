<?php
/**
 * Created by IntelliJ IDEA.
 * User: Daniel Surpanu
 * Date: 8/24/2018
 * Time: 4:53 AM
 */

if (!isset($_SESSION))
    session_start();

if (!isset($_SESSION['secure'], $_SESSION['username']))
    header('Location: index.php');
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
        <link rel="stylesheet" type="text/css" href="css/helper.css">
        <link rel="stylesheet" type="text/css" href="css/pdf-page.css">

        <link rel="stylesheet" href="css/jquery.mobile-1.4.5.min.css">

        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <script src="js/default/jquery.mobile-1.4.5.min.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
        <script type="text/javascript" src="js/default/html2canvas.min.js"></script>
        <script type="text/javascript" src="js/default/jspdf.min.js"></script>

        <title>Asso</title>
    </head>
    <body>
        <div data-role="panel" id="menu" data-position="left" data-display="overlay" data-theme="a">
            <img src="img/logo.png" class="menu-title">
            <ul data-role="listview">
                <li data-role="list-divider">Documenti</li>
                <li><a href="#anagrafica">Anagrafica</a></li>
                <li><a href="#contratti">Contratti</a></li>
                <li><a href="#fatture">Fatture</a></li>
                <li><a href="#rapporti">Rapporti di intervento</a></li>
                <li><a href="#attrezzature">Attrezzature</a></li>
                <li data-role="list-divider">Utente</li>
                <li><a href="#richiestaAssistenza">Richiesta assistenza</a></li>
                <li><a href="#sorveglianza">Sorveglianza</a></li>
                <li><a href="#modificaPassword">Modifica password</a></li>
                <li><a href="#" id="logout" class="red-text">Log out</a></li>
            </ul>
        </div>
        <div data-role="page" id="home">
            <div data-theme="" data-role="header" data-position="fixed" data-fullscreen="false" data-id="mainHeader" class="background-green">
                <a href="#menu" class="menu-icon border-1-green border-radius-none"><img src="img/menu-icon1.png" class="menu-icon-image background-green"></a>
            </div>
            <div data-role="content">
                <img src="img/logo.jpg" id="benvenuto-image">
                <h1 class="login-header home-phrase">BENVENUTO NELLA TUA AREA PERSONALE</h1>
                <p class="center-text"></p>
                <div data-role="collapsible" class="contratti-collapsible">
                    <h3>Dove trovarci</h3>
                    <a href="https://goo.gl/maps/hukYqVjJyj72" data-role="button" data-icon="maps-icon" data-iconpos="right" class="red-text">Via Carnia 127R</a>
                    <a href="#" data-role="button" id="antani">16161 Teglia Genova</a>
                </div>
                <div data-role="collapsible" class="contratti-collapsible">
                    <h3>Come contattarci</h3>
                    <a href="tel://0106018258" class="ui-btn fatture-item"><p>Telefono: <b class="red-text">010 6018258</b></p></a>
                    <a href="#" class="ui-btn fatture-item"><p>Fax: 010 6012665</p></a>
                    <a href="mailto:info@assoantincendio.com?Subject=" target="_top" data-role="button" data-icon="email-icon" data-iconpos="right">
                        E-mail: <span class="text-transfor-none red-text">info@assoantincendio.com</span>
                    </a>
                </div>
                <div id="facebook">
                    <a href="https://www.linkedin.com/in/gorla-christian-04265b78/"><img src="img/icona_linkedin.png" class="social" style="float: right"></a>
                    <a href="https://www.facebook.com/assoantincendio/" ><img src="img/icona_fb.png" class="social"></a>
                </div>
            </div>
        </div>

        <div data-role="page" id="anagrafica">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader" data-fullscreen="false" class="background-green">
                <a href="#menu" class="menu-icon border-1-green border-radius-none"><img src="img/menu-icon1.png" class="menu-icon-image background-green"></a>
                <a href="#home" class="menu-icon border-1-green border-radius-none"><img src="img/home-icon.png" class="menu-icon-image background-green"></a>
            </div>

            <div data-role="content" class="anagrafica-padding margin-bottom-30 background-white">
                <h1 class="red-text philosopher-font header-page-title" id="anagraficaHeader">ANAGRAFICA</h1>
                <div id="anagraficaContainer"></div>
            </div>

            <div data-role="footer" data-position="fixed" data-fullscreen="false">
                <div><a href="#cambioAnagrafica" id="cambia-anagrafica-button" class="ui-btn ui-shadow ui-corner-all visualizza-button-anagrafica margin-auto font-large">CAMBIA ANAGRAFICA</a></div>
            </div>
        </div>

        <div data-role="page" id="cambioAnagrafica">
            <div data-theme="" data-role="header" data-position="fixed" data-fullscreen="false" data-id="mainHeader" class="background-green">
                <a href="#menu" class="menu-icon border-1-green border-radius-none"><img src="img/menu-icon1.png" class="menu-icon-image background-green"></a>
                <a href="#home" class="menu-icon border-1-red border-radius-none border-radius-none"><img src="img/home-icon.png" class="menu-icon-image background-green"></a>
            </div>

            <div data-role="content" class="anagrafica-padding">
                <h1 class="red-text philosopher-font header-page-title">CAMBIO ANAGRAFICA</h1>
                <div class="ui-field-contain">
                    <label for="changeAnagraficaSelection" class="cambio-anagrafica-form-label border-bottom-1-red margin-auto float-none">Modifica campi anagrafica</label>
                    <div id="cambioAnagraficaForm" class="padding-tb-2px-lr-7px">
<!--                        <select id="changeAnagraficaSelection">-->
<!--                            <option>Seleziona una voce...</option>-->
<!--                        </select>-->
                    </div>
                </div>
                <div id="valoreAnagrafica" class="clear-float-left"></div>

                <div id="cambioAnagraficaMessaggioErrore"></div>

                <div data-role="footer" data-position="fixed" class="background-white" data-fullscreen="false">
<!--                    <a href="#" id="aggiungiModifica" class="aggiungiModifica inset-shadow-orange ui-disabled" data-role="button" data-inline="true">Aggiungi Modifica</a>-->
<!--                    <a href="#" id="cancellaModifica" class="cancellaModifica inset-shadow-red ui-disabled" data-role="button" data-inline="true">Cancella</a>-->
                    <a href="#" id="inviaCambioAnagraficaDati" class="inviaDati border-radius-none" data-role="button" data-inline="true">INVIA RICHIESTA</a>
                </div>

                <div id="error-change-anagrafica-popup" data-role="popup" data-overlay-theme="a" class="ui-content" data-history="false">
                    <p class="box-shadow-bottom center-text title"></p>
                    <p class="margin-top-20 content"></p>
                </div>

            </div>
        </div>

        <div data-role="page" id="contratti">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader" data-fullscreen="false" class="background-green">
                <a href="#menu" class="menu-icon border-1-green border-radius-none"><img src="img/menu-icon1.png" class="menu-icon-image background-green"></a>
                <a href="#home" class="menu-icon border-1-green border-radius-none"><img src="img/home-icon.png" class="menu-icon-image background-green"></a>
            </div>
            <div data-role="content">
                <h1 class="red-text philosopher-font header-page-title">CONTRATTI</h1>
                <div data-role="collapsible-set" data-inset="false" data-content-theme="d" id="contratti-list">
                </div>
            </div>
        </div>

        <div data-role="page" id="fatture">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader" data-fullscreen="false" class="background-green">
                <a href="#menu" class="menu-icon border-1-green border-radius-none"><img src="img/menu-icon1.png" class="menu-icon-image background-green"></a>
                <a href="#home" class="menu-icon border-1-green border-radius-none"><img src="img/home-icon.png" class="menu-icon-image background-green"></a>
            </div>
            <div data-role="content">
                <h1 class="red-text philosopher-font header-page-title">FATTURE</h1>
                <div data-role="collapsible-set" data-inset="false" data-content-theme="d" id="fatture-list">
                </div>
            </div>
        </div>

        <div data-role="page" id="rapporti">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader" data-fullscreen="false" class="background-green">
                <a href="#menu" class="menu-icon border-1-green border-radius-none"><img src="img/menu-icon1.png" class="menu-icon-image background-green"></a>
                <a href="#home" class="menu-icon border-1-green border-radius-none"><img src="img/home-icon.png" class="menu-icon-image background-green"></a>
            </div>
            <div data-role="content">
                <h1 class="red-text philosopher-font header-page-title">RAPPORTI</h1>
                <div data-role="collapsible-set" data-inset="false" data-content-theme="d" id="rapporti-list">
                </div>
            </div>
        </div>

        <div data-role="page" id="attrezzature">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader" data-fullscreen="false" class="background-green">
                <a href="#menu" class="menu-icon border-1-green border-radius-none"><img src="img/menu-icon1.png" class="menu-icon-image background-green"></a>
                <a href="#home" class="menu-icon border-1-green border-radius-none"><img src="img/home-icon.png" class="menu-icon-image background-green"></a>
            </div>
            <div data-role="content" id="attrezzature-container">
                <h1 class="red-text philosopher-font header-page-title margin-bottom-30">ATTREZZATURE</h1>
                <div data-role="collapsible-set" data-inset="false" data-content-theme="d" id="attrezzature-list">
                </div>
            </div>
        </div>

        <div data-role="page" id="richiestaAssistenza">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader" data-fullscreen="false" class="background-green">
                <a href="#menu" class="menu-icon border-1-green border-radius-none"><img src="img/menu-icon1.png" class="menu-icon-image background-green"></a>
                <a href="#home" class="menu-icon border-1-green border-radius-none"><img src="img/home-icon.png" class="menu-icon-image background-green"></a>
            </div>
            <div data-role="content" class="anagrafica-padding">
                <h1 class="red-text philosopher-font header-page-title margin-bottom-30">RICHIESTA ASSISTENZA</h1>
                <form>
                    <fieldset class="ui-field-contain" id="richiediAssistenzaForm" data-role="controlgoup" data-inset="true">
                        <label for="richiediAssistenzaForm" class="cambio-anagrafica-form-label border-bottom-1-red">Seleziona le informazioni richieste</label>
                        <select id="richiestaAssistenzaMotivoSelect" data-inset="true">
                            <option>Seleziona un motivo...</option>
                            <option>Altro...</option>
                        </select>
                        <div id="altro-selection" class="clear-float-left"></div>
                        <br>
                        <select id="richiestaAssistenzaContrattoSelect" class="ui-disabled" data-inset="true">>
                            <option>Seleziona un contratto...</option>
                        </select>
                        <br>
                        <select id="richiestaAssistenzaFilialeSelect" class="ui-disabled" data-inset="true">>
                            <option>Seleziona una filiale...</option>
                        </select>
                        <br>

                        <div class="info-tecnico clear-float-left">
                        </div>
                    </fieldset>
                </form>
                <div id="noteAggiuntive"></div>
                <div id="resultForCheck"></div>

                <div id="error-content-popup" data-role="popup" data-overlay-theme="a" class="ui-content error-popup" data-history="false">
                    <p class="box-shadow-bottom center-text title"></p>
                    <p class="margin-top-20 content"></p>
                </div>

                <div id="assistenzaMessaggioErrore"></div>
            </div>

            <div data-role="footer" data-position="fixed" data-fullscreen="false">
                <a href="#" id="inviaRichiestaAssistenzaDati" class="ui-disabled border-radius-none" data-role="button" data-inline="true">RICHIEDI ASSISTENZA</a>
            </div>
        </div>

        <div data-role="page" id="sorveglianza">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader" data-fullscreen="false" class="background-green">
                <a href="#menu" class="menu-icon border-1-green border-radius-none"><img src="img/menu-icon1.png" class="menu-icon-image background-green"></a>
                <a href="#home" class="menu-icon border-1-green border-radius-none"><img src="img/home-icon.png" class="menu-icon-image background-green"></a>
            </div>
            <div data-role="content" class="anagrafica-padding">
                <h1 class="red-text philosopher-font header-page-title">SORVEGLIANZA</h1>
                <div id="frequenza" data-role="fieldcontain">
                    <fieldset data-role="controlgroup" id="sorveglianzaRadioFieldset" data-type="horizontal">
                        <legend class="cambio-anagrafica-form-label border-bottom-1-red">Seleziona frequesnza</legend>
                        <input type="radio" name="frequenza" id="mensile" value="mensile" checked="checked">
                        <label for="mensile" class="radio-legend">Mensile</label>
                        <input type="radio" name="frequenza" id="bimestrale" value="bimestrale">
                        <label for="bimestrale">Bimestrale</label>
                        <input type="radio" name="frequenza" id="trimestrale" value="trimestrale">
                        <label for="trimestrale">Trimestrale</label>
                    </fieldset>
                </div>

                <form>
                    <fieldset class="ui-field-contain" id="sorveglianzaFieldSet" data-role="controlgoup" data-inset="true">
                        <label for="sorveglianzaLabelForm" class="cambio-anagrafica-form-label border-bottom-1-red">Seleziona le informazioni richieste</label>
                        <select id="sorveglianzaContrattoSelect" data-inset="true">>
                            <option>Seleziona un contratto...</option>
                        </select>
                        <br>
                        <select id="sorveglianzaFilialeSelect" class="ui-disabled" data-inset="true">>
                            <option>Seleziona una filiale...</option>
                        </select>
                        <br>
                    </fieldset>
                </form>

                <div id="referente-name" class="display-none">
                    <input type="text" class="padding-lr-zero" placeholder="Inserire nome incaricato">
                </div>

                <div id="sorveglianza-email" class="display-none">
                    <input type="text" class="padding-lr-zero" placeholder="Inserire email">
                </div>

                <div id="questionarioSorveglianza" class="margin-top-20"></div>
            </div>

            <div id="sorveglianzaMessaggioErrore"></div>

            <div data-role="footer" data-position="fixed" class="background-white" data-fullscreen="false">
                <a href="#" id="sorveglianzaAggiungiModifica" class="aggiungiModifica ui-disabled" data-role="button" data-inline="true">SOSPENDI SORVEGLIANZA</a>
<!--                <a href="#" id="sorveglianzaCancellaDati" class="cancellaModifica inset-shadow-red ui-disabled" data-role="button" data-inline="true">Cancella</a>-->
                <a href="#" id="sorveglianzaInviaDati" class="sorveglianzaInviaDati font-medium ui-disabled" data-role="button" data-inline="true">INVIA SORVEGLIANZA</a>
            </div>

            <div id="error-sorveglianza-popup" data-role="popup" data-overlay-theme="a" class="ui-content error-popup" data-history="false">
                <p class="box-shadow-bottom center-text title"></p>
                <p class="margin-top-20 content"></p>
            </div>

            <div data-role="popup" id="back-sorveglianza-confirm" class="padding-20-40" data-history="false" data-overlay-theme="a">
                <div data-role="content">
                    <h3 class="back-sorveglianza-confirm-header center-text blue-color margin-bottom-30 font-x-large"></h3>
                    <p class="back-sorveglianza-confirm-text center-text margin-bottom-30"></p>
                    <a href="#" class="back-sorveglianza-confirm-button width-90 margin-lr-auto border-red-1 red-color inset-shadow-orange" data-role="button" data-rel="back">Elimina tipologia</a>
                    <a href="#" class="width-90 margin-lr-auto border-green-1 green-color inset-shadow-green" data-role="button" data-rel="back">Anulla</a>
                </div>
            </div>
        </div>

        <div data-role="page" id="modificaPassword">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader" data-fullscreen="false" class="background-green">
                <a href="#menu" class="menu-icon border-1-green border-radius-none"><img src="img/menu-icon1.png" class="menu-icon-image background-green"></a>
                <a href="#home" class="menu-icon border-1-green border-radius-none"><img src="img/home-icon.png" class="menu-icon-image background-green"></a>
            </div>
            <div data-role="content">
                <img src="img/logo.png" class="menu-title">
                <h1 class="login-header">Cambia password</h1>
                <form data-ajax="false" id="changePassForm">
                    <fieldset id="change-pass-fielset">
                        <input type="password" name="oldPassword" id="oldPassword" value="" data-clear-btn="true" placeholder="Inserisci vecchia password">
                        <input type="password" name="password" id="password" value="" data-clear-btn="true" placeholder="Inserisci password">
                        <input type="password" name="verifyPassword" id="vefifyPassword" value="" data-clear-btn="true" placeholder="Reinserisci password">
                        <br><input type="submit" id="reset-submit" data-inline="true" value="Invia">
                    </fieldset>
                </form>
            </div>
        </div>

        <div data-role="page" id="viewList">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader" data-fullscreen="false" class="background-green">
                <a href="#menu" class="menu-icon border-1-green border-radius-none"><img src="img/menu-icon1.png" class="menu-icon-image background-green"></a>
                <a href="#home" class="menu-icon border-1-green border-radius-none"><img src="img/home-icon.png" class="menu-icon-image background-green"></a>
            </div>
            <div data-role="content" id="viewListContent">
                <h1 class="red-text philosopher-font header-page-title">Lista Attrezzature</h1>
                <div data-role="collapsible-set" id="viewListCollapsible" data-inset="false" data-content-theme="d" id="fatture-list">
                </div>

                <div data-role="footer" id="viewListFooter" data-position="fixed" class="background-white" data-fullscreen="false">
                    <a href="#" id="salvaCsv" class="sorveglianzaInviaDati font-medium ui-disabled" data-role="button" data-inline="true">Salva csv</a>
                    <a href="#" id="salvaPdf" class="sorveglianzaInviaDati font-medium ui-disabled" data-role="button" data-inline="true">Salva pdf</a>
                </div>
            </div>
        </div>

        <div data-role="page" id="pdf-page">
            <div data-role="content" id="pdf-content">

<!--                <a href="javascript: generatePdf();" id="sorveglianzaInviaDati" class="sorveglianzaInviaDati font-medium" data-role="button" data-inline="true">Salva nel database</a>-->
            </div>

        </div>

        <div data-role="page" id="attrezzature-pdf" style="width: 100%!important;">
            <div data-role="content" id="attrezzature-pdf-content">

            </div>
        </div>

        <script src="js/logout.js"></script>
        <script src="js/onload.js"></script>
        <script src="js/helper.js"></script>
        <script src="js/get-fatture.js"></script>
        <script src="js/get-anagrafica.js"></script>
        <script src="js/get-contratti.js"></script>
        <script src="js/get-attrezzature.js"></script>
        <script src="js/view-list.js"></script>
        <script src="js/change-password.js"></script>
        <script src="js/get-rapporti.js"></script>
        <script src="js/change-anagrafica.js"></script>
        <script src="js/richiesta-assistenza.js"></script>
        <script src="js/sorveglianza.js"></script>
        <script src="js/generate_pdf.js"></script>
    </body>
</html>


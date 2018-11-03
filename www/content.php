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
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader">
                <a href="#menu" class="menu-icon"><img src="img/menu-icon.png" class="menu-icon-image"></a>
            </div>
            <div data-role="content">
                <img src="img/logo.png" id="benvenuto-image">
                <h1 class="login-header home-phrase">BENVENUTO NELLA TUA AREA PERSONALE</h1>
                <p class="center-text"></p>
                <div data-role="collapsible" class="contratti-collapsible">
                    <h3>Dove trovarci</h3>
                    <a href="https://goo.gl/maps/hukYqVjJyj72" data-role="button" data-icon="maps-icon" data-iconpos="right" class="blue-text">Via Carnia 127R</a>
                    <a href="#" data-role="button" id="antani">16161 Teglia Genova</a>
                </div>
                <div data-role="collapsible" class="contratti-collapsible">
                    <h3>Come contattarci</h3>
                    <a href="tel://232293685" class="ui-btn fatture-item"><p>Telefono: <b class="blue-text">010 6018258</b></p></a>
                    <a href="#" class="ui-btn fatture-item"><p>Fax: 010 6012665</p></a>
                    <a href="mailto:info@assoantincendio.com?Subject=" target="_top" data-role="button" data-icon="email-icon" data-iconpos="right">
                        E-mail: <span class="text-transfor-none blue-text">info@assoantincendio.com</span>
                    </a>
                </div>
                <div id="facebook">
                    <a href="https://www.linkedin.com/in/gorla-christian-04265b78/"><img src="img/icona_linkedin.png" class="social" style="float: right"></a>
                    <a href="https://www.facebook.com/assoantincendio/" ><img src="img/icona_fb.png" class="social"></a>
                </div>
            </div>
        </div>

        <div data-role="page" id="anagrafica">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader" data-fullscreen="false">
                <a href="#menu" class="menu-icon"><img src="img/menu-icon.png" class="menu-icon-image"></a>
                <a href="#home" class="menu-icon"><img src="img/home-icon.png" class="menu-icon-image"></a>
            </div>

            <div data-role="content" class="anagrafica-padding margin-bottom-30">
                <h1 class="red-text philosopher-font header-page-title" id="anagraficaHeader">Anagrafica</h1>
                <div id="anagraficaContainer"></div>
            </div>

            <div data-role="footer" data-position="fixed" data-fullscreen="true">
                <div><a href="#cambioAnagrafica" id="cambia-anagrafica-button" class="ui-btn ui-shadow ui-corner-all visualizza-button-anagrafica margin-auto font-large">Cambio anagrafica</a></div>
            </div>
        </div>

        <div data-role="page" id="cambioAnagrafica">
            <div data-theme="" data-role="header" data-position="fixed" data-fullscreen="false" data-id="mainHeader">
                <a href="#menu" class="menu-icon"><img src="img/menu-icon.png" class="menu-icon-image"></a>
                <a href="#home" class="menu-icon"><img src="img/home-icon.png" class="menu-icon-image"></a>
            </div>

            <div data-role="content" class="anagrafica-padding">
                <h1 class="red-text philosopher-font header-page-title">Cambia Anagrafica</h1>
                <div class="ui-field-contain">
                    <label for="changeAnagraficaSelection" class="cambio-anagrafica-form-label border-bottom-1-red">Seleziona campo da modificare</label>
                    <div id="cambioAnagraficaForm">
                        <select id="changeAnagraficaSelection">
                            <option>Seleziona una voce...</option>
                        </select>
                    </div>
                </div>
                <div id="valoreAnagrafica"></div>

                <div id="cambioAnagraficaValoriInseriti">
                    <ul id="cambiaAnagraficaList" data-role="listview" data-inset="true" class="anagrafica-list-margin">
                    </ul>
                </div>

                <div id="cambioAnagraficaMessaggioErrore"></div>

                <div data-role="footer" data-position="fixed" class="background-white">
                    <a href="#" id="aggiungiModifica" class="aggiungiModifica inset-shadow-orange ui-disabled" data-role="button" data-inline="true">Aggiungi Modifica</a>
                    <a href="#" id="cancellaModifica" class="cancellaModifica inset-shadow-red ui-disabled" data-role="button" data-inline="true">Cancella</a>
                    <a href="#" id="inviaCambioAnagraficaDati" class="inviaDati ui-disabled" data-role="button" data-inline="true">Invia</a>
                </div>

                <div id="error-change-anagrafica-popup" data-role="popup" data-overlay-theme="a" class="ui-content error-popup border-1-white" data-history="false">
                    <p class="error-title"></p>
                    <p class="error-content"></p>
                </div>

            </div>
        </div>

        <div data-role="page" id="contratti">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader">
                <a href="#menu" class="menu-icon"><img src="img/menu-icon.png" class="menu-icon-image"></a>
                <a href="#home" class="menu-icon"><img src="img/home-icon.png" class="menu-icon-image"></a>
            </div>
            <div data-role="content">
                <h1 class="red-text philosopher-font header-page-title">Contratti</h1>
                <div data-role="collapsible-set" data-inset="false" data-content-theme="d" id="contratti-list">
                </div>
            </div>
        </div>

        <div data-role="page" id="fatture">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader">
                <a href="#menu" class="menu-icon"><img src="img/menu-icon.png" class="menu-icon-image"></a>
                <a href="#home" class="menu-icon"><img src="img/home-icon.png" class="menu-icon-image"></a>
            </div>
            <div data-role="content">
                <h1 class="red-text philosopher-font header-page-title">Fatture</h1>
                <div data-role="collapsible-set" data-inset="false" data-content-theme="d" id="fatture-list">
                </div>
            </div>
        </div>

        <div data-role="page" id="rapporti">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader">
                <a href="#menu" class="menu-icon"><img src="img/menu-icon.png" class="menu-icon-image"></a>
                <a href="#home" class="menu-icon"><img src="img/home-icon.png" class="menu-icon-image"></a>
            </div>
            <div data-role="content">
                <h1 class="red-text philosopher-font header-page-title">Rapporti</h1>
                <div data-role="collapsible-set" data-inset="false" data-content-theme="d" id="rapporti-list">
                </div>
            </div>
        </div>

        <div data-role="page" id="attrezzature">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader" data-fullscreen="false">
                <a href="#menu" class="menu-icon"><img src="img/menu-icon.png" class="menu-icon-image"></a>
                <a href="#home" class="menu-icon"><img src="img/home-icon.png" class="menu-icon-image"></a>
            </div>
            <div data-role="content" id="attrezzature-container">
                <h1 class="red-text philosopher-font header-page-title margin-bottom-30">Attrezzature</h1>
            </div>
        </div>

        <div data-role="page" id="richiestaAssistenza">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader">
                <a href="#menu" class="menu-icon"><img src="img/menu-icon.png" class="menu-icon-image"></a>
                <a href="#home" class="menu-icon"><img src="img/home-icon.png" class="menu-icon-image"></a>
            </div>
            <div data-role="content" class="anagrafica-padding">
                <h1 class="red-text philosopher-font header-page-title margin-bottom-30">Richiedi assistenza</h1>
                <form>
                    <fieldset class="ui-field-contain" id="richiediAssistenzaForm" data-role="controlgoup" data-inset="true">
                        <label for="richiediAssistenzaForm" class="cambio-anagrafica-form-label">Seleziona le informazioni richieste</label>
                        <select id="richiestaAssistenzaMotivoSelect" data-inset="true">
                            <option>Seleziona un motivo...</option>
                            <option>Altro...</option>
                            <option>Motivo 1</option>
                            <option>Motivo 2</option>
                        </select>
                        <div id="altro-selection"></div>
                        <br>
                        <select id="richiestaAssistenzaContrattoSelect" class="ui-disabled" data-inset="true">>
                            <option>Seleziona un contratto...</option>
                        </select>
                        <br>
                        <select id="richiestaAssistenzaFilialeSelect" class="ui-disabled" data-inset="true">>
                            <option>Seleziona una filiale...</option>
                        </select>
                        <br>

                        <div class="info-tecnico">
                        </div>
                    </fieldset>
                </form>
                <div id="noteAggiuntive"></div>
                <div id="resultForCheck"></div>

                <div id="error-content-popup" data-role="popup" data-overlay-theme="a" class="ui-content error-popup" data-history="false">
                    <p class="error-title"></p>
                    <p class="error-content"></p>
                </div>

                <div id="assistenzaMessaggioErrore"></div>
            </div>

            <div data-role="footer" data-position="fixed">
                <a href="#" id="inviaRichiestaAssistenzaDati" class="ui-disabled" data-role="button" data-inline="true">Richiedi Assistenza</a>
            </div>
        </div>

        <div data-role="page" id="sorveglianza">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader" data-fullscreen="false">
                <a href="#menu" class="menu-icon"><img src="img/menu-icon.png" class="menu-icon-image"></a>
                <a href="#home" class="menu-icon"><img src="img/home-icon.png" class="menu-icon-image"></a>
            </div>
            <div data-role="content" class="anagrafica-padding">
                <h1 class="red-text philosopher-font header-page-title">Sorveglianza</h1>
                <div id="frequenza" data-role="fieldcontain">
                    <fieldset data-role="controlgroup" id="sorveglianzaRadioFieldset" data-type="horizontal">
                        <legend class="cambio-anagrafica-form-label">Seleziona frequesnza</legend>
                        <input type="radio" name="frequenza" id="mensile" value="mensile" checked="checked">
                        <label for="mensile">Mensile</label>
                        <input type="radio" name="frequenza" id="bimestrale" value="bimestrale">
                        <label for="bimestrale">Bimestrale</label>
                        <input type="radio" name="frequenza" id="trimestrale" value="trimestrale">
                        <label for="trimestrale">Trimestrale</label>
                    </fieldset>
                </div>

                <form>
                    <fieldset class="ui-field-contain" id="sorveglianzaFieldSet" data-role="controlgoup" data-inset="true">
                        <label for="sorveglianzaLabelForm" class="cambio-anagrafica-form-label">Seleziona le informazioni richieste</label>
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

                <div id="questionarioSorveglianza"></div>
            </div>

            <div id="sorveglianzaMessaggioErrore"></div>

            <div data-role="footer" data-position="fixed" class="background-white" data-fullscreen="false">
                <a href="#" id="sorveglianzaAggiungiModifica" class="aggiungiModifica inset-shadow-orange ui-disabled" data-role="button" data-inline="true">Salva per dopo</a>
<!--                <a href="#" id="sorveglianzaCancellaDati" class="cancellaModifica inset-shadow-red ui-disabled" data-role="button" data-inline="true">Cancella</a>-->
                <a href="#" id="sorveglianzaInviaDati" class="sorveglianzaInviaDati font-medium ui-disabled" data-role="button" data-inline="true">Salva nel database</a>
            </div>

            <div id="error-sorveglianza-popup" data-role="popup" data-overlay-theme="a" class="ui-content error-popup" data-history="false">
                <p class="error-title"></p>
                <p class="error-content"></p>
            </div>
        </div>

        <div data-role="page" id="modificaPassword">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader">
                <a href="#menu" class="menu-icon"><img src="img/menu-icon.png" class="menu-icon-image"></a>
                <a href="#home" class="menu-icon"><img src="img/home-icon.png" class="menu-icon-image"></a>
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
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader">
                <a href="#menu" class="menu-icon"><img src="img/menu-icon.png" class="menu-icon-image"></a>
                <a href="#home" class="menu-icon"><img src="img/home-icon.png" class="menu-icon-image"></a>
            </div>
            <div data-role="content" id="viewListContent">
                <h1 class="red-text philosopher-font header-page-title">Lista Attrezzature</h1>
                <div data-role="collapsible-set" id="viewListCollapsible" data-inset="false" data-content-theme="d" id="fatture-list">
                </div>
            </div>
        </div>

        <div data-role="page" id="pdf-page">
            <div data-role="content" id="pdf-content">
                <div>
                    <p class="float-left margin-right-50px font-medium">Check-list Sorveglianza</p>
                    <div class="float-left">
                                <div class="float-left margin-right-10px">
                                    <label class="font-x-small padding-left-30px"><input type="radio" name="frequency-pdf" id="Mensile-pdf" value="on" checked="checked">Mensile</label>
                                </div>
                                <div class="float-left margin-right-10px">
                                    <label class="font-x-small padding-left-30px"><input type="radio" name="frequency-pdf" id="bimestrale-pdf" value="off">Bimestrale</label>
                                </div>
                                <div class="float-left margin-right-10px">
                                    <label class="font-x-small padding-left-30px"><input type="radio" name="frequency-pdf" id="trimestrale-pdf" value="other">Trimestrale</label>
                                </div>
                    </div>
                </div>

                <br><br><br><br>

                <div class="clear-float-left position-absolute">
                    <p class="font-medium"><b>Incaricato Sig:</b> Antani Scapelli</p>
                    <p class="font-medium"><b>Data:</b> 30/10/2018</p>
                </div>
                <div class="float-right">
                    <img src="img/logo_small.jpg">
                </div>
                <div>
                    <table data-role="table" id="estintori-table" data-mode="reflow" class="ui-responsive">
                        <thead>
                        <tr>
                            <th colspan="4" data-priority="1" class="border-1-black background-gray">Estintori portatili / carrellati: </th>
                        </tr>
                        </thead>
                        <tbody id="estintori-body">
                            <tr>
                                <th class="border-1-black width-3 center-text padding-9px font-small">1</th>
                                <td class="border-1-black padding-9px font-small">presenza del sigilio di controllo</td>
                                <td class="border-1-black width-5 padding-0"><label class="font-small"><input type="checkbox" name="checkbox-0 ">SI</label></td>
                                <td class="border-1-black width-5 padding-0"><label class="font-small"><input type="checkbox" name="checkbox-0 ">NO</label></td>
                            </tr>
                            <tr>
                                <th class="border-1-black width-3 center-text padding-9px font-small">1</th>
                                <td class="border-1-black padding-9px font-small">collocazione adeguata: visibile, accessibile, libera da ostacoli</td>
                                <td class="border-1-black width-5 padding-0"><label class="font-small"><input type="checkbox" name="checkbox-0 ">SI</label></td>
                                <td class="border-1-black width-5 padding-0"><label class="font-small"><input type="checkbox" name="checkbox-0 ">NO</label></td>
                            </tr>
                            <tr>
                                <th class="border-1-black width-3 center-text padding-9px font-small">1</th>
                                <td class="border-1-black padding-9px font-small">presenza del cartello segnalatore</td>
                                <td class="border-1-black width-5 padding-0"><label class="font-small"><input type="checkbox" name="checkbox-0 ">SI</label></td>
                                <td class="border-1-black width-5 padding-0"><label class="font-small"><input type="checkbox" name="checkbox-0 ">NO</label></td>
                            </tr>
                            <tr>
                                <th></th>
                            </tr>
                        </tbody>


                        <thead>
                        <tr>
                            <th colspan="4" data-priority="1" class="border-1-black background-gray">Idranti a muro / naspi: </th>
                        </tr>
                        </thead>
                        <tbody id="estintori-body">
                            <tr>
                                <th class="border-1-black width-3 center-text padding-9px font-small">1</th>
                                <td class="border-1-black padding-9px font-small">presenza della manichetta / lancia/ sella</td>
                                <td class="border-1-black width-5 padding-0"><label class="font-small"><input type="checkbox" name="checkbox-0 ">SI</label></td>
                                <td class="border-1-black width-5 padding-0"><label class="font-small"><input type="checkbox" name="checkbox-0 ">NO</label></td>
                            </tr>
                            <tr>
                                <th class="border-1-black width-3 center-text padding-9px font-small">1</th>
                                <td class="border-1-black padding-9px font-small">collocazione adeguata: visibile, accessibile, libera da ostacoli</td>
                                <td class="border-1-black width-5 padding-0"><label class="font-small"><input type="checkbox" name="checkbox-0 ">SI</label></td>
                                <td class="border-1-black width-5 padding-0"><label class="font-small"><input type="checkbox" name="checkbox-0 ">NO</label></td>
                            </tr>
                            <tr>
                                <th class="border-1-black width-3 center-text padding-9px font-small">1</th>
                                <td class="border-1-black padding-9px font-small">presenza cartello indicatore</td>
                                <td class="border-1-black width-5 padding-0"><label class="font-small"><input type="checkbox" name="checkbox-0 ">SI</label></td>
                                <td class="border-1-black width-5 padding-0"><label class="font-small"><input type="checkbox" name="checkbox-0 ">NO</label></td>
                            </tr>
                            <tr>
                                <th class="border-1-black width-3 center-text padding-9px font-small">1</th>
                                <td class="border-1-black padding-9px font-small">esame visivo dello stato della saracinesca</td>
                                <td class="border-1-black width-5 padding-0"><label class="font-small"><input type="checkbox" name="checkbox-0 ">SI</label></td>
                                <td class="border-1-black width-5 padding-0"><label class="font-small"><input type="checkbox" name="checkbox-0 ">NO</label></td>
                            </tr>

                            </tbody>
                    </table>
                </div>

                <a href="javascript: generatePdf();" id="sorveglianzaInviaDati" class="sorveglianzaInviaDati font-medium" data-role="button" data-inline="true">Salva nel database</a>
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


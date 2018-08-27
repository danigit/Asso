<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 8/24/2018
 * Time: 4:53 AM
 */

if (!isset($_SESSION))
    session_start();

if (!isset($_SESSION['secure'], $_SESSION['username']))
    //TODO redirect nella pagina giusto
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
        <link rel="stylesheet" type="text/css" href="css/index.css">
        <link rel="stylesheet" type="text/css" href="css/custom.css">

        <link rel="stylesheet" href="css/jquery.mobile-1.4.5.min.css">

        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <script src="js/default/jquery.mobile-1.4.5.min.js"></script>
        <script type="text/javascript" src="js/index.js"></script>

        <title>Asso</title>
    </head>
    <body>
        <div data-role="panel" id="menu" data-position="left" data-display="overlay" data-theme="a">
            <h3 class="center-text menu-title">MENU</h3>
            <ul data-role="listview">
                <li data-role="list-divider">Documenti</li>
                <li><a href="#anagrafica">Anagrafica</a></li>
                <li><a href="#contratti">Contratti</a></li>
                <li><a href="#fatture">Fatture</a></li>
                <li><a href="#rapporti">Rapporti di intervento</a></li>
                <li><a href="#attrezzature">Attrezzature</a></li>
                <li data-role="list-divider">Utente</li>
                <li><a href="#modificaPassword">Modifica password</a></li>
                <li><a href="#" id="logout">Log out</a></li>
            </ul>
        </div>
        <div data-role="page" id="home">
            <div data-theme="" data-role="header">
                <a href="#menu" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-bars">Menu</a>
                <h1>ASSO</h1>
            </div>
            <div data-role="content">
                <h1 class="login-header">BENVENUTO</h1>
                <img src="img/benvenuto.jpg" id="benvenuto-image">
                <p class="center-text">Benvenuto nel nuovo sito Asso Antincendio</p>
                <p class="benvenuto-text">Altri contenuti....</p>
            </div>
        </div>

        <div data-role="page" id="anagrafica">
            <div data-theme="" data-role="header">
                <a href="#menu" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-bars">Menu</a>
                <h1>ASSO</h1>
                <a href="#home" class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-home">Home</a>
            </div>
            <div data-role="content">
                Anagrafica
            </div>
        </div>

        <div data-role="page" id="contratti">
            <div data-theme="" data-role="header">
                <a href="#menu" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-bars">Menu</a>
                <h1>ASSO</h1>
                <a href="#home" class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-home">Home</a>
            </div>
            <div data-role="content">
                Contratti
            </div>
        </div>

        <div data-role="page" id="fatture">
            <div data-theme="" data-role="header">
                <a href="#menu" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-bars">Menu</a>
                <h1>ASSO</h1>
                <a href="#home" class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-home">Home</a>
            </div>
            <div data-role="content">
                <h1 class="blue-text philosopher-font login-separator">Fatture</h1>
                <div data-role="collapsible-set" data-inset="false" data-content-theme="d" id="fatture-list">
                </div>
            </div>
        </div>

        <div data-role="page" id="rapporti">
            <div data-theme="" data-role="header">
                <a href="#menu" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-bars">Menu</a>
                <h1>ASSO</h1>
                <a href="#home" class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-home">Home</a>
            </div>
            <div data-role="content">
                Rapporti
            </div>
        </div>

        <div data-role="page" id="attrezzature">
            <div data-theme="" data-role="header">
                <a href="#menu" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-bars">Menu</a>
                <h1>ASSO</h1>
                <a href="#home" class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-home">Home</a>
            </div>
            <div data-role="content">
                Attrezzature
            </div>
        </div>

        <div data-role="page" id="modificaPassword">
            <div data-theme="" data-role="header">
                <a href="#menu" class="ui-btn-left ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-bars">Menu</a>
                <h1>ASSO</h1>
                <a href="#home" class="ui-btn-right ui-btn ui-btn-inline ui-mini ui-corner-all ui-btn-icon-left ui-icon-home">Home</a>
            </div>
            <div data-role="content">
                Cambia password
            </div>
        </div>
        <script src="js/logout.js"></script>
        <script src="js/onload.js"></script>
        <script src="js/helper.js"></script>
        <script src="js/show-file.js"></script>
        <script src="js/get-fatture.js"></script>
    </body>
</html>


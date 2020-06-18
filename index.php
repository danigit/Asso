<?php

if (!isset($_SESSION))
    session_start();

if (isset($_SESSION['secure'], $_SESSION['username']))
    header('Location: content.php');
?>

<!DOCTYPE html>
<html lang="it">
    <head>
        <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'; media-src *; img-src 'self' data: content:;">
        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
        <link rel="stylesheet" type="text/css" href="css/custom.css">

        <link rel="stylesheet" href="css/jquery.mobile-1.4.5.min.css">


        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <script src="js/default/jquery.mobile-1.4.5.min.js"></script>

        <title>Asso</title>

    </head>
    <body>
    
<!--   DIV PAGINA INDEX ---> 
        <div data-role="page" id="pageIndex">
            <div data-role="content" id="login-content">
                
                <img src="img/AsspCopertinaFacebook.jpg" class="login-image" id="imgAsso" alt="Asso Antincendio" title="Asso Antincendio">
                
                <div style="clear:both; height:50px">
                        &nbsp
                </div>

                <div style="clear:both;height:50px;">
                    <div style="float:left;" class="divBtnIndex">
                        <a href="#pageLogin"><img src="img/img-accedi.png" id="BtnAccedi"  alt="Accedi" title="Accedi"></a>
                    </div>
                    <div style="float:left; width:2%">
                        &nbsp
                    </div>
                    <div style="float:left; " class="divBtnIndex">
                        <a href="#pageRegister"><img src="img/img-registrati.png" id="BtnRegistrati"  alt="Registrati" title="Registrati"></a>
                    </div>
                </div>    

                <div style="clear:both; height:10px">
                        &nbsp
                </div>

                <div style="clear:both;" id="bottone-call" class="divBtnIndex2">
                    <img src="img/img-contattaci.png" id="BtnContattaci"  alt="Contattaci" title="Contattaci">
                </div>

                <div style="clear:both;height:30px; margin:10px; text-align:center;"> 
                    <div style="display:inline-block; width:12%; height:20px; margin:5px;" id="logoWA">
                        <a href="https://api.whatsapp.com/send?phone=+393488261954&text=" target="_blank"><img src="img/logo_wa.png" id="logoWA-image" alt="logoWA" title="LogoWA"></a>                   
                    </div> 
                    <div style="display:inline-block; width:12%; height:20px; text-align:center;margin:5px">
                        <a href="https://www.facebook.com/search/top/?q=asso%20antincendio%20e%20sicurezza%20s.r.l." target="_blank"><img src="img/logo_fb.png" id="logoFB-image" alt="logoFB" title="LogoFB"></a>
                    </div>
                    <div style="display:inline-block; width:12%; height:20px; text-align:center;margin:5px">
                        <a href="https://t.me/assoantincendioesicurezzasrl" target="_blank"><img src="img/logo_telegram.png" id="logoTelegram-image" alt="logoTelegram" title="LogoTelegram"></a>
                    </div>
                    <div style="display:inline-block; width:12%; height:20px; text-align:center;margin:5px">
                        <a href="mailto:info@assoantincendio.com"><img src="img/logo_mail.png" id="logoMail-image" alt="logoMail" title="LogoMail"></a>
                    </div>
                    <div style="display:inline-block; width:12%; height:20px; text-align:center;margin:5px">
                        <a href="https://www.linkedin.com/in/gorla-christian-04265b78/" target="_blank"><img src="img/logo_linkedin.png" id="logoLinkedin-image" alt="logoLinkedin" title="LogoLinkedin"></a>
                    </div>
                    <div style="display:inline-block; width:12%; height:20px; text-align:center;margin:5px">
                        <a href="https://goo.gl/maps/SXV8BoyDCTJc4ZrYA" target="_blank"><img src="img/logo_gmaps.png" id="logoGMaps-image" alt="logoGMaps" title="LogoGMaps"></a>
                    </div>
                    
                </div>  
               
               <div style="clear:both; height:50px">
                        &nbsp
                </div>
            </div>

            <div data-role="footer"  style="text-align:center; white-space: pre"> Asso antincendio e Sicurezza Srl
 Via Carnia 127/129R - 16161 genova</div>
                
        </div>

<!--   DIV PAGINA VUOTA PER HYSTORY --->    
         <div data-role="page" id="pageHystory">
           
            <div data-role="content" id="hystory-content" style="height:100%;overflow:scroll;font-family:courier;">
                   
           
     <h1>STORIA</h1>            
     <p style="white-space: pre;">
       <strong>9 Marzo 2020 - Versione 2.0.0</strong>
        - NEW: Importa anche le note del tecnico da laboratorio
        - FIX: fixo il baco
        - CHG: cambiamento a qualcosa di esistente
        // secondo numero per modifiche o aggiunte , terzo numero per i fix
        
        - NEW: Grafica e icone all'interno del sito rifatte come richiesto dal cliente
        - FIX: Corretto un problema nel quale alcune funzioni come changePassword o register accedevano i file locali invece che al DB
        - NEW: Creato un file padeIndex.js per la gestione della pagina iniziale
        - NEW: Creato recoverPassword.js per la funzionalità di recupero della password
        - CHG: Aggiornati nomi e richiami agli oggetti/funzioni nei vari file .php e .js
        - NEW: Aggiunti graficamente i bottoni per delle possibili nuove funzionalità
        
        - TODO: La funzione di cambio anagrafica, funzione disdetta del contratto , invio sorveglianza
        - TOCHECK: funzione richiesta assistenza, sospensione sorveglianza
     </p>

            </div>
            
            <div style="float:right; " class="divBtnMezzoSchermo">
                       <a href="#pageIndex" ><img src="img/img-esci.png" id="BtnEsci"  alt="Esci" title="Esci"></a>
            </div>
                
         </div>
         


<!--   DIV PAGINA DI LOG IN --->       

        <div data-role="page" id="pageLogin">
           
         <div data-role="content" id="login-content" >
                
                <img src="img/AsspCopertinaFacebook.jpg" id="login-image" class="login-image" alt="Asso Antincendio" title="Asso Antincendio">
                <h1 style="color:#2dad63;font-family:neuropolregular; margin-top:15px; margin-bottom:30px" class="login-header; "> Accesso utente</h1> <!-- da cambiare il font-->
                
                 <form data-ajax="false" id="loginForm" style="clear:both">   
                  <fieldset id="login-fielset">
                  </fieldset> 
                  
                        <!--<label style="color:#2dad63;">Partita Iva
                        <input type="text" name="piva" id="piva" value="" data-clear-btn="true" >
                        </label>-->
                        <label style="color:#2dad63;">Email</label>
                        <input type="text" name="email" id="email" value="" data-clear-btn="true" >
                        <label style="color:#2dad63;">Password</label>
                        <input type="password" name="password" id="password" value="" data-clear-btn="true" >
                         
          
                </form>
                        
                    
                <div style="clear:both;height:50px;"> 
                    <div style="float:left; " class="divBtnMezzoSchermo">
                        <a href=""><img src="img/img-accediLog.png" id="BtnAccediLog"  alt="AccediLog" title="AccediLog"></a>
                    </div>
                    <div style="float:left; width:2%">
                        &nbsp
                    </div>
                    <div style="float:left; " class="divBtnMezzoSchermo">
                       <a href="#pageIndex" ><img src="img/img-esci.png" id="BtnEsci"  alt="Esci" title="Esci"></a>
                    </div>
                </div>    

                <div style="clear:both; height:10px">
                        &nbsp
                </div>

                <div style="clear:both; background:#00963f; height:35px; text-align:center; padding-top:5px;">
                    <a href="#pageRecoverPsw"><img src="img/img-pswforget.png" id="BtnPswForget"  alt="PswForget" title="PwsForget"></a>
                </div>
                

          </div>  
        </div>  
            
<!--   DIV PAGINA DI RECUPERO PSW --->    

        <div data-role="page" id="pageRecoverPsw">
            <div data-role="content" id="recover-content">
                
                <img src="img/AsspCopertinaFacebook.jpg" id="login-image" class="login-image" alt="Asso Antincendio" title="Asso Antincendio">
                <h1 class="login-header" style="color:#2dad63;">Recupera password</h1>
                <div data-role="content">
                
                    <form data-ajax="false" id="recoverForm">  
                       <fieldset id="error-recover-password">
                       </fieldset> 
                       
                         <label style="color:#2dad63;">INSERISCI E-MAIL
                         <input type="text" name="mailRecover" id="mailRecover" value="" data-clear-btn="true" >
                         </label> 
                         
                       
                    </form>
                    
                    <div id="error-content-popup" data-role="popup" data-overlay-theme="a" class="ui-content error-popup" data-history="false">
                        <p class="box-shadow-bottom center-text title"></p>
                        <p class="margin-top-20 content"></p>
                    </div>

                    <div style="text-align:center;">
                       <div style="clear:both;height:50px;">
                            <div style="float:left; " class="divBtnMezzoSchermo">
                                <a href=""><img src="img/img-accediLog.png" id="BtnInviaRecoverPSW"  alt="Invia" title="Invia"></a>
                            </div>
                            <div style="float:left; width:2%">
                                &nbsp
                            </div>
                            <div style="float:left; " class="divBtnMezzoSchermo">
                               <a href="#pageLogin" ><img src="img/img-esci.png" id="BtnEsci"  alt="Esci" title="Esci"></a>
                            </div>
                        </div> 
                    </div>
                    

                    <div id="error-recover-password-popup" data-role="popup" data-overlay-theme="a" class="ui-content error-popup" data-history="false">
                        <p class="box-shadow-bottom center-text title"></p>
                        <p class="margin-top-20 content"></p>
                    </div>

                </div>
            </div>
        </div>

<!--   DIV PAGINA DI REGISTRAZIONE UTENTE --->    

        <div data-role="page" id="pageRegister">
            <div data-role="content" id="register-content">
                <img src="img/AsspCopertinaFacebook.jpg" class="login-image" alt="Asso Antincendio" title="Asso Antincendio">
                <h1 class="login-header" style="color:#2dad63;font-family:neuropolregular;">Registrazione Utente</h1>
                <form data-ajax="false" id="registerForm">
                        <fieldset id="error-register-user">
                        </fieldset>
                        <label style="color:#2dad63;">INSERISCI PARTITA IVA <input type="text" id="registerUsername" name="registerUsername" value=""> </label>
                        <label for="registerEmail" style="color:#2dad63;">INSERISCI EMAIL <input type="text" id="registerEmail" name="registerEmail" value=""> </label>
                        <label for="registerName" style="color:#2dad63;">INSERISCI NOME <input type="text" id="registerName" name="registerName" value=""> </label>
                        <label for="registerSurname" style="color:#2dad63;">INSERISCI COGNOME <input type="text" id="registerSurname" name="registerSurname" value=""> </label>
                        <label for="registerPhone" style="color:#2dad63;">INSERISCI TELEFONO FISSO <input type="text" id="registerPhone" name="registerPhone" value=""> </label>
                        
                        <label class="checkbox-register" data-inset="false">
                            <input type="checkbox" name="checkbox-register" ><span class="text-transfor-none">Clicca per accettare l'informativa</span>
                        </label>
                        
                        <div data-role="collapsible" data-inset="false" class="privacy-div">
                            <h5 style="margin-bottom:5px;">Leggi informativa sulla privacy</h5>
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
                        
                        
                        <div style="clear:both;height:50px;">
                           <div style="float:left; " class="divBtnMezzoSchermo">
                               <a href=""><img src="img/img-conferma.png" id="BtnConfemaReg"  alt="ConfermaReg" title="Conferma"></a>
                           </div>
                           <div style="float:left; width:2%">
                               &nbsp
                           </div>
                           <div style="float:left; " class="divBtnMezzoSchermo">
                              <a href="#pageIndex" ><img src="img/img-esci.png" id="BtnEsci"  alt="Esci" title="Esci"></a>
                           </div>
                       </div> 
                
                       
                  
                    
                
                
           
                </form>
            </div>
        </div>
        <script type="text/javascript" src="js/globale.js"></script>
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
        <script type="text/javascript" src="js/register.js"></script>
        <script type="text/javascript" src="js/recoverPassword.js"></script>
        <script type="text/javascript" src="js/pageIndex.js"></script>
        <script type="text/javascript" src="js/helper.js"></script>
        <script type="text/javascript" src="js/login.js"></script>
        

    </body>
</html>

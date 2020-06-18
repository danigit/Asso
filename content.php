<?php

if (!isset($_SESSION))
    session_start();

if (!isset($_SESSION['secure'], $_SESSION['username']))
    header('Location: index.php');
?>

<!DOCTYPE html>
<html lang="it">
    <head>
        <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'; media-src *; img-src 'self' data: content:;">
        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
        <link rel="stylesheet" type="text/css" href="css/custom.css">
        <link rel="stylesheet" type="text/css" href="css/helper.css">
        <link rel="stylesheet" type="text/css" href="css/pdf-page.css">

        <link rel="stylesheet" href="css/jquery.mobile-1.4.5.min.css">

        <script src="js/default/jquery-2.2.4.js"></script>
        <script src="js/default/jquery.mobile-1.4.5.min.js"></script>
        <script type="text/javascript" src="js/default/html2canvas.min.js"></script>
        <script type="text/javascript" src="js/default/jspdf.min.js"></script>
        <script type="text/javascript" src="js/default/jspdf.plugin.autotable.js"></script>

        <title>Asso</title>
    </head>
    <body>
<!--   DIV PAGINA HOME --->               
        <div data-role="page" id="home">
                        
            <div data-role="content" id="home-content">
                <img src="img/AsspCopertinaFacebook.jpg" id="login-image" class="login-image" alt="Asso Antincendio" title="Asso Antincendio">
               
                <div style="clear:both;" class="divBtnLargo">
                    <a href=""><img src="img/img-anagrafica.png" id="BtnAnagrafica"  alt="Anagrafica" title="Anagrafica"></a> 
                </div>  
                
                <div style="clear:both; height:10px">
                        &nbsp
                </div>
                
               <div style="clear:both;height:50px;">
                    <div style="float:left; " class="divBtnMezzoSchermo">
                        <a href=""><img src="img/img-contratti.png" id="BtnContratti"  alt="Contratti" title="Contratti"></a>
                    </div>
                    <div style="float:left; width:2%">
                        &nbsp
                    </div>
                    <div style="float:left; " class="divBtnMezzoSchermo">
                       <a href=""><img src="img/img-fatture.png" id="BtnFatture"  alt="Fatture" title="Fatture"></a>
                    </div>
                </div>    
                
                <div style="clear:both; height:10px">
                        &nbsp
                </div>
                
               <div style="clear:both;height:50px;">
                    <div style="float:left; " class="divBtnMezzoSchermo">
                        <a href=""><img src="img/img-rapporti.png" id="BtnRapporti"  alt="Rapporti" title="Rapporti"></a>
                    </div>
                    <div style="float:left; width:2%">
                        &nbsp
                    </div>
                    <div style="float:left; " class="divBtnMezzoSchermo">
                       <a href=""><img src="img/img-attrezzature.png" id="BtnAttrezzature"  alt="Attrezzature" title="Attrezzature"><a/>
                    </div>
                </div> 
                
                <div style="clear:both; height:10px">
                        &nbsp
                </div>
                
               <div style="clear:both;height:50px;">
                    <div style="float:left; " class="divBtnMezzoSchermo">
                        <a href=""><img src="img/img-assistenza.png" id="BtnAssistenza"  alt="Assistenza" title="Assistenza"></a>
                    </div>
                    <div style="float:left; width:2%">
                        &nbsp
                    </div>
                    <div style="float:left; " class="divBtnMezzoSchermo">
                       <a href=""><img src="img/img-sorveglianza.png" id="BtnSorveglianza"  alt="Sorveglianza" title="Sorveglianza"></a>
                    </div>
                </div> 
                

                <div style="clear:both; height:10px">
                        &nbsp
                </div>

                <div style="clear:both; background:#00963f; height:35px; text-align:center; padding-top:5px;">
                
                    <a href=""><img src="img/img-modpsw.png" id="BtnModPsw"  alt="ModPsw" title="ModPws"></a>
                </div>
                
                <div style="clear:both; height:10px"> 
                        &nbsp
                </div>

                <div style="clear:both; background:#e3000f; height:35px; text-align:center; padding-top:5px;">
                
                    <a href=""><img src="img/img-logout.png" id="BtnLogout"  alt="Logout" title="Logout"></a>
                </div>
                
            </div>
        </div>




<!--   DIV PAGINA ANAGRAFICA ---> 
        <div data-role="page" id="anagrafica">
           

            <div data-role="content"  style="text-align:center">
                <div style="clear:both; "  class="divHeaderPage">
                  <div style="float:left">
                    <img src="img/img-schedaAnagrafica.png" id="schedaAnagrafica"  alt="schedaAnagrafica" title="schedaAnagrafica">
                  </div>
                  <div class="divHeaderText">
                    Scheda anagrafica
                  </div>
                </div>
                <div id="anagraficaContainer"></div>
               
               <div style="clear:both;height:50px;">
                    <div style="float:left; " class="divBtnMezzoSchermo">
                        <a href=""><img src="img/img-modanagrafica.png" id="BtnModAnagrafica"  alt="modAnagrafica" title="modAnagrafica"></a>
                    </div>
                    <div style="float:left; width:2%">
                        &nbsp
                    </div>
                    <div style="float:left; " class="divBtnMezzoSchermo">
                       <a href="#home" ><img src="img/img-esci.png" id="BtnEsci"  alt="Esci" title="Esci"></a>
                    </div>
               </div>
            </div> 
            
            
            
        </div>

<!--   DIV PAGINA DEL CAMBIO ANAGRAFICA ---> 
        <div data-role="page" id="cambioAnagrafica">
            

            <div data-role="content" class="anagrafica-padding">
                <div data-role="content"  style="text-align:center">
                  <div style="clear:both; "  class="divHeaderPage">
                    <div style="float:left">
                      <img src="img/img-schedaAnagrafica.png" id="schedaAnagrafica"  alt="schedaAnagrafica" title="schedaAnagrafica">
                    </div>
                    <div class="divHeaderText">
                      Modifica anagrafica
                    </div>
                  </div>
                  <div id="anagraficaContainer"></div>
                </div>
                
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
                
                <div style="clear:both;height:50px;">
                    <div style="float:left; " class="divBtnMezzoSchermo">
                        <a href=""><img src="img/img-conferma.png" id="BtnInvia"  alt="Invia" title="Invia"></a>
                    </div>
                    <div style="float:left; width:2%">
                        &nbsp
                    </div>
                    <div style="float:left; " class="divBtnMezzoSchermo">
                       <a href="#home" ><img src="img/img-esci.png" id="BtnEsci"  alt="Esci" title="Esci"></a>
                    </div>
                </div>

                
                <div id="error-change-anagrafica-popup" data-role="popup" data-overlay-theme="a" class="ui-content" data-history="false">
                    <p class="box-shadow-bottom center-text title"></p>
                    <p class="margin-top-20 content"></p>
                </div>

            </div>
        </div>

<!--   DIV PAGINA DEI CONTRATTI ---> 
        <div data-role="page" id="contratti">
            
            <div data-role="content">
                <div style="clear:both; "  class="divHeaderPage">
                    <div style="float:left">
                      <img src="img/img-schedaContratti.png" id="schedaContratti"  alt="schedaContratti" title="schedaContratti">
                    </div>
                    <div class="divHeaderText">
                      Contratti
                    </div>
                </div>
                
                <div data-role="collapsible-set" data-inset="false" data-content-theme="d" id="contratti-list">
                </div>
                
                <div style="clear:both;height:50px;">
                    <div style="float:left; " class="divBtnMezzoSchermo">
                        <a href=""><img src="img/img-inviaDis.png" id="BtnPageDisdetta"  alt="PageDisdetta" title="PageDisdetta"></a>
                    </div>
                    <div style="float:left; width:2%">
                        &nbsp
                    </div>
                    <div style="float:left; " class="divBtnMezzoSchermo">
                       <a href="#home" ><img src="img/img-esci.png" id="BtnEsci"  alt="Esci" title="Esci"></a>
                    </div>
                </div>
            </div>
            
            
        </div>
        
<!--   DIV PAGINA PER LA DISDETTA DEI CONTRATTI ---> 
        <div data-role="page" id="disContratti">
            
            <div data-role="content">
                <div style="clear:both; "  class="divHeaderPage">
                    <div style="float:left">
                      <img src="img/img-schedaContratti.png" id="schedaContratti"  alt="schedaContratti" title="schedaContratti">
                    </div>
                    <div class="divHeaderText">
                      Disdetta Contratti
                    </div>
                </div>
                
                <div data-role="content" id= "lista-contratti-disdetta" class="width-100">
              <!--  <label><input type="checkbox" class="checkcontratti" name="pippo" id="pippo" IdContratto="635782">Descrizione: pippopopopopop </label> -->
                </div>
                
                <div style="clear:both;height:50px;">
                    <div style="float:left; " class="divBtnMezzoSchermo">
                        <a href=""><img src="img/img-inviaDis.png" id="BtnInviaDisdetta" alt="InviaDisdetta" title="InviaDisdetta"></a>
                    </div>
                    <div style="float:left; width:2%">
                        &nbsp
                    </div>
                    <div style="float:left; " class="divBtnMezzoSchermo">
                       <a href="#contratti" ><img src="img/img-esci.png" id="BtnEsci"  alt="Esci" title="Esci"></a>
                    </div>
                </div>
            </div>
            
            
        </div>
        
<!--   DIV PAGINA DELLE FATTURE ---> 
        <div data-role="page" id="fatture">
            
            <div data-role="content">
                <div style="clear:both; "  class="divHeaderPage">
                    <div style="float:left">
                      <img src="img/img-schedaFatture.png" id="schedaFatture"  alt="schedaFatture" title="schedaFatture">
                    </div>
                    <div class="divHeaderText">
                      Fatture
                    </div>
                </div>
                <div data-role="collapsible-set" data-inset="false" data-content-theme="d" id="fatture-list">
                </div>
                
                <div style="float:right; " class="divBtnMezzoSchermo">
                       <a href="#home" ><img src="img/img-esci.png" id="BtnEsci"  alt="Esci" title="Esci"></a>
                </div>
                    
            </div>
                    
                    
            
        </div>
        

<!--   DIV PAGINA DEI RAPPORTI ---> 
        <div data-role="page" id="rapporti">
            
            <div data-role="content">
                <div style="clear:both; "  class="divHeaderPage">
                    <div style="float:left">
                      <img src="img/img-schedaRapporti.png" id="schedaRapporti"  alt="schedaRapporti" title="schedaRapporti">
                    </div>
                    <div class="divHeaderText">
                      Rapporti d'intervento
                    </div>
                </div>
               
                <div data-role="collapsible-set" data-inset="false" data-content-theme="d" id="rapporti-list">
                </div>
                
                <div style="float:right; " class="divBtnMezzoSchermo">
                       <a href="#home" ><img src="img/img-esci.png" id="BtnEsci"  alt="Esci" title="Esci"></a>
                </div>
                
            </div>
            
                    
            
            
        </div>

<!--   DIV PAGINA DI ATTREZZATURE ---> 
        <div data-role="page" id="attrezzature">
            
            <div data-role="content" >
                <div style="clear:both; "  class="divHeaderPage">
                    <div style="float:left">
                      <img src="img/img-schedaAttrezzature.png" id="schedaAttrezzature"  alt="schedaAttrezzature" title="schedaAttrezzature">
                    </div>
                    <div class="divHeaderText">
                      Attrezzature
                    </div>
                </div>
                
                <div data-role="collapsible-set" data-inset="false" data-content-theme="d" id="attrezzature-list">
                </div>
                
                <div style="float:right; " class="divBtnMezzoSchermo">
                       <a href="#home" ><img src="img/img-esci.png" id="BtnEsci"  alt="Esci" title="Esci"></a>
                </div>
                
            </div>
            
                    
       
        </div>

<!--   DIV PAGINA DI ASSISTENZA ---> 
        <div data-role="page" id="richiestaAssistenza">
            
            <div data-role="content" >
                <div style="clear:both; "  class="divHeaderPage">
                    <div style="float:left">
                      <img src="img/img-schedaAssistenza.png" id="schedaAssistenza"  alt="schedaAssistenza" title="schedaAssistenza">
                    </div>
                    <div class="divHeaderText">
                      Richiesta Assistenza
                    </div>
                </div>
                
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

                        <div class="info-tecnico clear-float-left"></div>
                    </fieldset>
                </form>
                <div id="noteAggiuntive"></div>
                <div id="resultForCheck"></div>

                <div id="error-content-popup" data-role="popup" data-overlay-theme="a" class="ui-content error-popup" data-history="false">
                    <p class="box-shadow-bottom center-text title"></p>
                    <p class="margin-top-20 content"></p>
                </div>

                <div id="assistenzaMessaggioErrore"></div>
                
                <div style="clear:both;height:50px;">
                    <div style="float:left; " class="divBtnMezzoSchermo">
                        <a href=""><img src="img/img-inviaAss.png" id="BtnRichiediAssistenza"  alt="RichiediAssistenza" title="RichiediAssistenza"></a>
                    </div>
                    <div style="float:left; width:2%">
                        &nbsp
                    </div>
                    <div style="float:left; " class="divBtnMezzoSchermo">
                       <a href="#home" ><img src="img/img-esci.png" id="BtnEsci"  alt="Esci" title="Esci"></a>
                    </div>
                </div>
            
            </div>
            
            

            
        </div>

<!--   DIV PAGINA  DELLA SORVEGLIANZA ---> 
        <div data-role="page" id="sorveglianza">
            
            <div data-role="content" >
                <div style="clear:both; "  class="divHeaderPage">
                    <div style="float:left">
                      <img src="img/img-schedaSorveglianza.png" id="schedaSorveglianza"  alt="schedaSorveglianza" title="schedaSorveglianza">
                    </div>
                    <div class="divHeaderText">
                      Sorveglianza
                    </div>
                </div>
                <div id="frequenza" data-role="fieldcontain">
                    <fieldset data-role="controlgroup" id="sorveglianzaRadioFieldset" data-type="horizontal">
                        <legend class="cambio-anagrafica-form-label border-bottom-1-red">Seleziona frequenza</legend>
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
                
                <div style="clear:both;height:50px;">
                    <div style="float:left; " class="divBtnTriploSchermo">
                        <a href=""><img src="img/img-sospendiSor.png" id="BtnSospendiSorveglianza"  alt="SospendiSorveglianza" title="SospendiSorveglianza"></a>
                    </div>
                    <div style="float:left; width:2%">
                        &nbsp
                    </div>
                    <div style="float:left; " class="divBtnTriploSchermo">
                       <a href="#" ><img src="img/img-inviaSor.png" id="BtnInviaSorveglianza"  alt="InviaSorveglianza" title="InviaSorveglianza"></a>
                    </div>
                    <div style="float:left; width:2%">
                        &nbsp
                    </div>
                    <div style="float:left; " class="divBtnTriploSchermo">
                       <a href="#home" ><img src="img/img-esci2.png" id="BtnEsci"  alt="Esci" title="Esci"></a>
                    </div>
                </div>
            
            </div>
            
            

            <div data-role="popup" id="open-assistenza-confirm" class="padding-20-40" data-history="false" data-overlay-theme="a">
                <div data-role="content">
                    <h3 class="open-assistenza-confirm-header center-text blue-color margin-bottom-30 font-x-large"></h3>
                    <p class="delete-object-confirm-text center-text margin-bottom-30"></p>
                    <a href="#richiestaAssistenza" id="open-assistenza-confirm-button" class="background-green white-text" data-role="button">Apri Richiesta</a>
                    <a href="#" id="open-assistenza-cancel-button" class="red-background white-text" data-role="button" data-rel="back">Anulla</a>
                </div>
            </div>

            <div id="sorveglianzaMessaggioErrore"></div>

            
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

<!--   DIV PAGINA  DI MODIFICA PASSWORD ---> 
        <div data-role="page" id="modificaPassword">
           
            <div data-role="content" id="modificaPassword-content">
                <img src="img/AsspCopertinaFacebook.jpg" id="login-image" class="login-image" alt="Asso Antincendio" title="Asso Antincendio">
                <div style="clear:both; "  class="divHeaderPage">
                    <div style="float:left">
                      <img src="img/img-schedaModPSW.png" id="schedaModPSW"  alt="schedaModPSW" title="schedaModPSW">
                    </div>
                    <div class="divHeaderText">
                      MOD.PASSWORD
                    </div>
                </div>
                
                <form data-ajax="false" id="changePassForm" style="clear:both">
                    <fieldset id="change-pass-fielset">
                        <input type="password" name="oldPassword" id="oldPassword" value="" data-clear-btn="true" placeholder="Inserisci vecchia password">
                        <input type="password" name="password" id="password" value="" data-clear-btn="true" placeholder="Inserisci nuova password">
                        <input type="password" name="verifyPassword" id="vefifyPassword" value="" data-clear-btn="true" placeholder="Reinserisci password">
                        
                    </fieldset>
                </form>
                
                <div style="clear:both;height:50px;">
                    <div style="float:left; " class="divBtnMezzoSchermo">
                        <a href=""><img src="img/img-confermaPSW.png" id="BtncambiaPSW"  alt="cambiaPSW" title="cambiaPSW"></a>
                    </div>
                    <div style="float:left; width:2%">
                        &nbsp
                    </div>
                    <div style="float:left; " class="divBtnMezzoSchermo">
                       <a href="#home" ><img src="img/img-esci.png" id="BtnEsci"  alt="Esci" title="Esci"></a>
                    </div>
                </div>
            </div>
 
        </div>

        <div data-role="page" id="viewList">
            <div data-theme="" data-role="header" data-position="fixed" data-id="mainHeader" data-fullscreen="false" class="background-green">
                
                <a href="#home" class="menu-icon border-none border-radius-none"><img src="img/home-icon.png" class="menu-icon-image background-green" alt="Asso Antincendio" title="Asso Antincendio"></a>
            </div>
            <div data-role="content" id="viewListContent">
                <h1 class="red-text philosopher-font header-page-title">Lista Attrezzature</h1>
                <div data-role="collapsible-set" id="viewListCollapsible" data-inset="false" data-content-theme="d" id="fatture-list">
                </div>

                <div data-role="footer" id="viewListFooter" data-position="fixed" class="background-white" data-fullscreen="false">
                    <a href="#" id="salvaCsv" class="sorveglianzaInviaDati font-medium ui-disabled padding-lr-zero-tb-9px" data-role="button" data-inline="true">SALVA CSV</a>
                    <a href="#" id="salvaPdf" class="sorveglianzaInviaDati font-medium ui-disabled padding-lr-zero-tb-9px" data-role="button" data-inline="true">ESPORTA LISTA IN PDF</a>
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

        <script src="js/globale.js"></script>
        <script src="js/login.js"></script>
        <script src="js/pageIndex.js"></script>
        <script src="js/logout.js"></script>
        <script src="js/onload.js"></script>
        <script src="js/helper.js"></script>
        <script src="js/get-fatture.js"></script>
        <script src="js/get-anagrafica.js"></script>
        
        <script src="js/get-contratti-disdetta.js"></script>  
        <script src="js/get-contratti.js"></script>   
        <script src="js/send-cancel-contracts.js"></script>   
           
        
        <script src="js/get-attrezzature.js"></script>
        <script src="js/view-list.js"></script>
        <script src="js/change-password.js"></script>
        <script src="js/get-rapporti.js"></script>
        <script src="js/change-anagrafica.js"></script>
        <script src="js/richiesta-assistenza.js"></script>
        <script src="js/sorveglianza.js"></script>
        <script src="js/generate_pdf.js"></script>
        <script src="js/generate_attrezzature_pdf.js"></script>
        <script src="js/save-pdf.js"></script>
        <script src="js/index.js"></script>
    </body>
</html>


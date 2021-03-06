'use strict';

let undefinedSymbol = ' - ';
/**
 * Funzione che visualizza la lista degli elementi presenti nella reccuperata attraverso elem
 * @param elem - nome della lista degli elementi da visualizzare
 * @param contratto
 */
function viewList(elem, contratto) {
    //nascondo su mobile il pulsante di salvataggio in file csv
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('#salvaCsv').hide();
    }

    //preparo i dati da spedire
    let viewForm = new FormData();
    viewForm.append('lista', elem);
    viewForm.append('contratto', contratto);

    $('#viewListCollapsible').html('');

    //invio richiesta httpxml
    let attrezzaturePromise = httpPost('php/ajax/get_viewlist.php', viewForm);

    //interpreto la risposta
    attrezzaturePromise.then(
        function (data) {
            //controllo se non ci sono stati errori nella risposta
            if (data.result) {

                $.each(data[0], function (key, value) {
                    let content = "";

                    //divido le atrezzature per contratto
                    var label = $('<a href="#" data-inset="false" class="fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + key + '</a>');
                    $('#viewListCollapsible').append(label);

                    let i = 1;
                    let boccOrder = {};

                    $.each(value, function (innerKey, innerValue) {
                        let elemOrder;

                        if (elem === 'LISTA_ESTINTORI') {
                            elemOrder = {
                                PROGRESSIVO: innerValue.PROGRESSIVO,
                                TIPOLOGIA: controlUndefined(innerValue.DESCRIZIONE),
                                MATRICOLA: controlUndefined(innerValue.MATRICOLA),
                                CLASSE_FUOCO: controlUndefined(innerValue.CLASSE_FUOCO),
                                ANNO_COSTRUZIONE: controlUndefined(innerValue.ANNO_COSTRUZIONE),
                                SCADENZA_REVISIONE: controlUndefined(innerValue.SCADENZA_REVISIONE),
                                SCADENZA_COLLAUDO: controlUndefined(innerValue.SCADENZA_COLLAUDO),
                                ANNO_SOSTITUZIONE: controlUndefined(innerValue.ANNO_SOSTITUZIONE),
                                UBICAZIONE: controlUndefined(innerValue.UBICAZIONE),
                            };
                        }else if(elem === 'LISTA_PORTE'){
                            elemOrder = {
                                PROGRESSIVO: controlUndefined(innerValue.PROGRESSIVO),
                                MATRICOLA: controlUndefined(innerValue.MATRICOLA),
                                ANNO_COSTRUZIONE: controlUndefined(innerValue.ANNO_COSTRUZIONE),
                                TIPOLOGIA: controlUndefined(innerValue.TIPO_PORTA),
                                MARCA: controlUndefined(innerValue.MARCA),
                                MARCA_MANIGLIONE: controlUndefined(innerValue.MARCA_MANIGLIONE),
                                MANIGLIONE: controlUndefined(innerValue.TIPO_MANIGLIONE),
                                GUARNIZIONE: controlUndefined(innerValue.TIPO_GUARNIZIONE) / 100,
                                MANIGLIA_ESTERNA: controlUndefined(innerValue.TIPO_MANIGLIA_ESTERNA),
                                DIMENSIONE: controlUndefined(innerValue.DIMENSIONE),
                                INSTALLAZIONE: controlUndefined(innerValue.TIPO_INSTALLAZIONE),
                                SERATURA_PRINC: controlUndefined(innerValue.TIPO_SERATURA_ANTA_PRINCIPALE),
                                SERATURA_SEC: controlUndefined(innerValue.TIPO_SERATURA_ANTA_SECONDARIA),
                                ANTE: controlUndefined(innerValue.ANTE),
                                UBICAZIONE: controlUndefined(innerValue.UBICAZIONE),
                            };
                        }else if (elem === 'LISTA_LUCI'){
                            elemOrder = {
                                PROGRESSIVO: controlUndefined(innerValue.PROGRESSIVO),
                                TIPOLOGIA: controlUndefined(innerValue.TIPO_LUCE),
                                MARCA: controlUndefined(innerValue.MARCA_LUCE),
                                MODELLO: controlUndefined(innerValue.MODELLO),
                                AUTONOMIA: controlUndefined(innerValue.AUTONOMIA),
                                UBICAZIONE: controlUndefined(innerValue.UBICAZIONE),
                            };
                        }else if(elem === 'LISTA_IDRANTI'){
                            elemOrder = {
                                DESCRIZIONE: controlUndefined(innerValue.DESCRIZIONE),
                                TIPO: controlUndefined(innerValue.TIPO_IMPIANTO),
                                VALVOLA_INTERCETTAZIONE: controlUndefined(innerValue.VALVOLA_INTERCETTAZIONE),
                                UBICAZIONE: controlUndefined(innerValue.UBICAZIONE),
                                UBICAZIONE_ATTACCO_MOTOPOMPA: controlUndefined(innerValue.UBICAZIONE_ATTACCO_MOTOPOMPA)
                            };

                            $.each(innerValue.BOCCHELLO, function (lastKey, lastValue) {
                                boccOrder = {
                                    ID: controlUndefined(lastValue.ID_BOCCHELLO),
                                    TIPOLOGIA: controlUndefined(lastValue.TIPO_BOCCHELLO),
                                    LUNGHEZZA_MANICHETTA: controlUndefined(lastValue.LUNGHEZZA_MANICHETTA) / 10,
                                    LANCIA: controlUndefined(lastValue.TIPO_LANCIA),
                                    ANNO_COSTRUZIONE: controlUndefined(lastValue.ANNO_COSTRUZIONE),
                                    PROX_COLLAUDO: controlUndefined(lastValue.PROX_COLLAUDO),
                                    UBICAZIONE: controlUndefined(lastValue.UBICAZIONE),
                                }
                            })
                        }else if(elem === 'LISTA_SPRINKLER'){
                            elemOrder = {
                                DESCRIZIONE: controlUndefined(innerValue.DESCRIZIONE),
                                TIPOLOGIA: controlUndefined(innerValue.TIPO),
                                MARCA: controlUndefined(innerValue.MARCA),
                                MODELLO: controlUndefined(innerValue.MODELLO),
                                TARATURA_VALVOLE: controlUndefined(innerValue.TARATURA_VALVOLE),
                                VALVOLE_RICAMBIO: controlUndefined(innerValue.VALVOLE_RICAMBIO),
                                COMPRESSORE: controlUndefined(innerValue.COMPRESSORE),
                                QTA_VALVOLE: controlUndefined(innerValue.QUANTITA_VALVOLE),
                                UBICAZIONE: controlUndefined(innerValue.UBICAZIONE),
                            }
                        }else if(elem === 'LISTA_RILEVATORI_FUMI'){
                            elemOrder = {
                                UBICAZIONE: controlUndefined(innerValue.UBICAZIONE),
                                DESCRIZIONE: controlUndefined(innerValue.DESCRIZIONE),
                                MARCA_CENTRALE: controlUndefined(innerValue.MARCA_CENTRALE),
                                TIPO_CENTRALE: controlUndefined(innerValue.TIPO_CENTRALE),
                                QTA_BATTRIE: controlUndefined(innerValue.QUANTITA_BATTRIE),
                                QTA_RILEVATORI: controlUndefined(innerValue.QUANTITA_RILEVATORI),
                                TIPO_RILEVATORI: controlUndefined(innerValue.TIPO_RILEVATORI),
                                QTA_RIL_LINEARI: controlUndefined(innerValue.QUANTITA_RIL_LINEARI),
                                QTA_PULSANTI: controlUndefined(innerValue.QUANTITA_PULSANTI),
                                QTA_TOA: controlUndefined(innerValue.QUANTITA_PANELLI_OTT_ACUST),
                                TIPO_BATTERIE: controlUndefined(innerValue.TIPO_BATTERIE),
                                // FILIALE: innerValue.FILIALE
                            }
                        }

                        //controllo se l'articolo contiene una matricola e lo inserisco
                        if(innerValue.MATRICOLA)
                            content += "<div data-role='collapsible' class='viewlist-collapsible'><h3>Nr: " + innerValue.PROGRESSIVO + " / Matricola: " + innerValue.MATRICOLA + "</h3>";
                        else if(innerValue.PROGRESSIVO)
                            content += "<div data-role='collapsible' class='viewlist-collapsible'><h3>Progressivo: " + innerValue.PROGRESSIVO + " / Ubicazione: " + innerValue.UBICAZIONE + "</h3>";
                        else
                            content += "<div data-role='collapsible' class='viewlist-collapsible'><h3>Descrizione: " + innerValue.DESCRIZIONE + "</h3>";

                        $.each(innerValue, function (lastKey, lastValue) {
                            //controllo se l'articolo e' un array in modo da visualizzare anche i suoi elementi
                            if($.isArray(lastValue)){
                                //se l'aray e' vuoto non inserisco niente
                                if(!$.isEmptyObject(lastValue)) {
                                    content += "<div data-role='collapsible' data-collapsed-icon='carat-d' data-expanded-icon='carat-u' data-iconpos='right' data-inset='true'><h3>Manichette</h3>";
                                    $.each(lastValue, function (mk, mv) {
                                        content += "<div data-role='collapsible' data-collapsed-icon='carat-d' data-expanded-icon='carat-u' data-iconpos='right' data-inset='true'><h3>Manichetta numero: " + mv.ID_BOCCHELLO + "</h3>";
                                        $.each(boccOrder, function (label, value) {
                                            if(!(label === 'FILIALE'))
                                                content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="red-text">' + label.replace('_', ' ') + ':</b> </p><p class="float-right line-wrap">' + value + '</p></a>';
                                        });
                                        content += '</div>';
                                    });

                                    content += '</div>';
                                }
                            }else {
                                // if(!(lastKey === 'FILIALE'))
                                //     content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">' + lastKey.replace('_', ' ') + '</b> </p><p class="float-right line-wrap">' + lastValue + '</p></a>';
                            }
                        });

                        $.each(elemOrder, function (key, value) {
                            content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="red-text">' + key.replace(/_/g, ' ') + ':</b> </p><p class="float-right line-wrap">' + value + '</p></a>';
                        });

                        content += '</div>';
                    });
                    $("#viewListCollapsible").append( content );
                    $('#viewListCollapsible').collapsibleset();
                    $('#viewListCollapsible').collapsibleset('refresh');

                });

                $('#salvaCsv').removeClass('ui-disabled');
                $('#salvaCsv').on('click', function () {
                    downloadCsv({filename: elem.split('_')[1] + '.csv'}, {data: data[0], columnDelimiter: "\t", lineDelimiter: '\n'});
                });

                $('#salvaPdf').removeClass('ui-disabled');
                $('#salvaPdf').on('click', function () {
                    let nowDate = new Date($.now());
                    let month = nowDate.getMonth()+1;
                    let day = nowDate.getDate();
                    let nowData = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + nowDate.getFullYear();
                    createAttrezzaturePdf({data: data[0], contratto: contratto, nowData: nowData});
                })
            } else {
                $('#viewListCollapsible').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
            }
        }
    );
}

function controlUndefined(value) {
    return (value === undefined) ? undefinedSymbol : value
}
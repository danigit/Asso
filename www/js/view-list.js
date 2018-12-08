'use strict';

/**
 * Funzione che visualizza la lista degli elementi presenti nella reccuperata attraverso elem
 * @param elem - nome della lista degli elementi da visualizzare
 * @param contratto
 */
function viewList(elem, contratto) {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('#viewListFooter').hide();
    }
    //preparo i dati da spedire
    let viewForm = new FormData();
    viewForm.append('lista', elem);
    viewForm.append('contratto', contratto);
    $('#viewListCollapsible').html('');

    let attrezzaturePromise = httpPost('php/ajax/get_viewlist.php', viewForm);

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
                    console.log('value');
                    console.log(value);
                    let boccOrder = {};

                    $.each(value, function (innerKey, innerValue) {
                        if($.isPlainObject(innerValue) && $.isEmptyObject(boccOrder)){
                            $.each(innerValue.BOCCHELLO, function (lastKey, lastValue) {
                                boccOrder = {

                                }
                            })
                        }
                            console.log(innerValue);
                        let elemOrder;

                        if (elem === 'LISTA_ESTINTORI') {
                            elemOrder = {
                                PROGRESSIVO: innerValue.PROGRESSIVO,
                                TIPOLOGIA: innerValue.DESCRIZIONE,
                                MATRICOLA: innerValue.MATRICOLA,
                                CLASSE_FUOCO: innerValue.CLASSE_FUOCO,
                                ANNO_COSTRUZIONE: innerValue.ANNO_COSTRUZIONE,
                                SCADENZA_REVISIONE: innerValue.SCADENZA_REVISIONE,
                                SCADENZA_COLLAUDO: innerValue.SCADENZA_COLLAUDO,
                                ANNO_SOSTITUZIONE: innerValue.ANNO_SOSTITUZIONE,
                                UBICAZIONE: innerValue.UBICAZIONE
                            };
                        }else if(elem === 'LISTA_PORTE'){
                            elemOrder = {
                                PROGRESSIVO: innerValue.PROGRESSIVO,
                                MATRICOLA: innerValue.MATRICOLA,
                                ANNO_COSTRUZIONE: innerValue.ANNO_COSTRUZIONE,
                                TIPOLOGIA: innerValue.TIPO_PORTA,
                                MARCA: innerValue.MARCA,
                                MARCA_MANIGLIONE: innerValue.MARCA_MANIGLIONE,
                                MANIGLIONE: innerValue.TIPO_MANIGLIONE,
                                GUARNIZIONE: innerValue.TIPO_GUARNIZIONE / 100,
                                MANIGLIA_ESTERNA: innerValue.TIPO_MANIGLIA_ESTERNA,
                                DIMENSIONE: innerValue.DIMENSIONE,
                                INSTALLAZIONE: innerValue.TIPO_INSTALLAZIONE,
                                SERATURA_PRINC: innerValue.TIPO_SERATURA_ANTA_PRINCIPALE,
                                SERATURA_SEC: innerValue.TIPO_SERATURA_ANTA_SECONDARIA,
                                ANTE: innerValue.ANTE,
                                UBICAZIONE: innerValue.UBICAZIONE,
                            };
                        }else if (elem === 'LISTA_LUCI'){
                            elemOrder = {
                                PROGRESSIVO: innerValue.PROGRESSIVO,
                                TIPOLOGIA: innerValue.TIPO_LUCE,
                                MARCA: innerValue.MARCA_LUCE,
                                MODELLO: innerValue.MODELLO,
                                AUTONOMIA: innerValue.AUTONOMIA,
                                UBICAZIONE: innerValue.UBICAZIONE
                            };
                        }else if(elem === 'LISTA_IDRANTI'){
                            elemOrder = {
                                DESCRIZIONE: innerValue.DESCRIZIONE,
                                TIPO: innerValue.TIPO_IMPIANTO,
                                VALVOLA_INTERCETTAZIONE: innerValue.VALVOLA_INTERCETTAZIONE,
                                UBICAZIONE: innerValue.UBICAZIONE,
                                UBICAZIONE_ATTACCO_MOTOPOMPA: innerValue.UBICAZIONE_ATTACCO_MOTOPOMPA
                            },

                            $.each(innerValue.BOCCHELLO, function (lastKey, lastValue) {
                                boccOrder = {
                                    ID: lastValue.ID_BOCCHELLO,
                                    TIPOLOGIA: lastValue.TIPO_BOCCHELLO,
                                    LUNGHEZZA_MANICHETTA: lastValue.LUNGHEZZA_MANICHETTA / 10,
                                    LANCIA: lastValue.TIPO_LANCIA,
                                    ANNO_COSTRUZIONE: lastValue.ANNO_COSTRUZIONE,
                                    PROX_COLLAUDO: lastValue.PROX_COLLAUDO,
                                    UBICAZIONE: lastValue.UBICAZIONE,
                                }
                            })
                        }else if(elem === 'LISTA_SPRINKLER'){
                            elemOrder = {
                                DESCRIZIONE: innerValue.DESCRIZIONE,
                                TIPOLOGIA: innerValue.TIPOLOGIA,
                                MARCA: innerValue.MARCA,
                                MODELLO: innerValue.MODELLO,
                                TARATURA_VALVOLE: innerValue.TARATURA_VALVOLE,
                                VALVOLE_RICAMBIO: innerValue.VALVOLE_RICAMBIO,
                                COMPRESSORE: innerValue.COMPRESSORE,
                                QTA_VALVOLE: innerValue.QUANTITA_VALVOLE,
                                UBICAZIONE: innerValue.UBICAZIONE,
                            }
                        }else if(elem === 'LISTA_RILEVATORI_FUMI'){
                            elemOrder = {
                                UBICAZIONE: innerValue.UBICAZIONE,
                                DESCRIZIONE: innerValue.DESCRIZIONE,
                                MARCA_CENTRALE: innerValue.MARCA_CENTRALE,
                                TIPO_CENTRALE: innerValue.TIPO_CENTRALE,
                                QTA_BATTRIE: innerValue.QUANTITA_BATTRIE,
                                QTA_RILEVATORI: innerValue.QUANTITA_RILEVATORI,
                                TIPO_RILEVATORI: innerValue.TIPO_RILEVATORI,
                                QTA_RIL_LINEARI: innerValue.QUANTITA_RIL_LINEARI,
                                QTA_PULSANTI: innerValue.QUANTITA_PULSANTI,
                                QTA_TOA: innerValue.QUANTITA_PANELLI_OTT_ACUST,
                                TIPO_BATTERIE: innerValue.TIPO_BATTERIE,
                                // FILIALE: innerValue.FILIALE
                            }
                        }

                        //controllo se l'articolo contiene una matricola e lo inserisco
                        if(innerValue.MATRICOLA)
                            content += "<div data-role='collapsible' class='viewlist-collapsible'><h3>Matricola: " + innerValue.MATRICOLA + " / Nr: " + innerValue.PROGRESSIVO + "</h3>";
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
                    console.log('saving csv');
                    downloadCsv({filename: elem.split('_')[1] + '.csv'}, {data: data[0], columnDelimiter: "\t", lineDelimiter: '\n'});
                })

                $('#salvaPdf').removeClass('ui-disabled');
                $('#salvaPdf').on('click', function () {
                    console.log('saving pdf');
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


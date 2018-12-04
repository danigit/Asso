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
                    $.each(value, function (innerKey, innerValue) {
                        console.log(elem);
                        let elemOrder;

                        if (elem === 'LISTA_ESTINTORI') {
                            elemOrder = {
                                PROGRESSIVO: innerValue.PROGRESSIVO,
                                DESCRIZIONE: innerValue.DESCRIZIONE,
                                MATRICOLA: innerValue.MATRICOLA,
                                ANNO_COSTRUZIONE: innerValue.ANNO_COSTRUZIONE,
                                CLASSE_FUOCO: innerValue.CLASSE_FUOCO,
                                SCADENZA_REVISIONE: innerValue.SCADENZA_REVISIONE,
                                SCADENZA_COLLAUDO: innerValue.SCADENZA_COLLAUDO,
                                UBICAZIONE: innerValue.UBICAZIONE
                            };
                        }else if(elem === 'LISTA_PORTE'){
                            elemOrder = {
                                PROGRESSIVO: innerValue.PROGRESSIVO,
                                MATRICOLA: innerValue.MATRICOLA,
                                TIPO_PORTA: innerValue.TIPO_PORTA,
                                ANNO_COSTRUZIONE: innerValue.ANNO_COSTRUZIONE,
                                ANTE: innerValue.ANTE,
                                MARCA: innerValue.MARCA,
                            };
                        }else if (elem === 'LISTA_LUCI'){
                            elemOrder = {
                                PROGRESSIVO: innerValue.PROGRESSIVO,
                                TIPO_LUCE: innerValue.TIPO_LUCE,
                                MARCA_LUCE: innerValue.MARCA_LUCE,
                                UBICAZIONE: innerValue.UBICAZIONE
                            };
                        }else if(elem === 'LISTA_IDRANTI'){
                            elemOrder = {
                                DESCRIZIONE: innerValue.DESCRIZIONE,
                                TIPO: innerValue.TIPO
                            }
                        }else if(elem === 'LISTA_SPRINKLER'){
                            console.log('lista sprinkler...' + elem);
                            elemOrder = {
                                CHIAVE: innerValue.CHIAVE,
                                // FILIALE: innerValue.FILIALE,
                                MARCA: innerValue.MARCA,
                                TARATURA_VALVOLE: innerValue.TARATURA_VALVOLE,
                                VALVOLE_RICAMBIO: innerValue.VALVOLE_RICAMBIO,
                                UBICAZIONE: innerValue.UBICAZIONE,
                                TIPO: innerValue.TIPO,
                                STATO: innerValue.STATO,
                                ANOMALIA_APROVATA: innerValue.ANOMALIA_APROVATA,
                                ANOMALIA: innerValue.ANOMALIA,
                                MODELLO: innerValue.MODELLO,
                                COMPRESSORE: innerValue.COMPRESSORE,
                                NOTE: innerValue.NOTE,
                                QUANTITA_VALVOLE: innerValue.QUANTITA_VALVOLE,
                                DESCRIZIONE: innerValue.DESCRIZIONE,
                                FILIALE1: innerValue.FILIALE1,
                                MARCA1: innerValue.MARCA1
                                }
                        }else if(elem === 'LISTA_RILEVATORI_FUMI'){
                            console.log('fumi');
                            console.log(innerValue.UBICAZIONE);
                            elemOrder = {
                                UBICAZIONE: innerValue.UBICAZIONE,
                                MARCA_CENTRALE: innerValue.MARCA_CENTRALE,
                                TIPO_CENTRALE: innerValue.TIPO_CENTRALE,
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
                                        $.each(mv, function (label, value) {
                                            console.log(label);
                                            console.log(value);
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
                            content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="red-text">' + key.replace('_', ' ') + '</b> </p><p class="float-right line-wrap">' + value + '</p></a>';
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


'use strict';

/**
 * Funzione che visualizza la lista degli elementi presenti nella reccuperata attraverso elem
 * @param elem - nome della lista degli elementi da visualizzare
 * @param contratto
 */
function viewList(elem, contratto) {
    //preparo i dati da spedire
    var viewForm = new FormData();
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
                        //controllo se l'articolo contiene una matricola e lo inserisco
                        console.log('innerValue');
                        console.log(innerValue.MATRICOLA);
                        if(innerValue.MATRICOLA)
                            content += "<div data-role='collapsible' class='viewlist-collapsible'><h3>Matricola: " + innerValue.MATRICOLA + " / Nr: " + innerValue.PROGRESSIVO + "</h3>";
                        else
                            content += "<div data-role='collapsible' class='viewlist-collapsible'><h3>Progressivo: " + innerValue.PROGRESSIVO + " / Ubicazione: " + innerValue.UBICAZIONE + "</h3>";

                        $.each(innerValue, function (lastKey, lastValue) {
                            //controllo se l'articolo e' un array in modo da visualizzare anche i suoi elementi
                            if($.isArray(lastValue)){
                                //se l'aray e' vuoto non inserisco niente
                                if(!$.isEmptyObject(lastValue)) {
                                    content += "<div data-role='collapsible' data-collapsed-icon='carat-d' data-expanded-icon='carat-u' data-iconpos='right' data-inset='true'><h3>Manichette</h3>";
                                    $.each(lastValue, function (mk, mv) {
                                        content += "<div data-role='collapsible' data-collapsed-icon='carat-d' data-expanded-icon='carat-u' data-iconpos='right' data-inset='true'><h3>Manichetta numero: " + mv.ID_BOCCHELLO + "</h3>";
                                        $.each(mv, function (label, value) {
                                            if(!(label === 'FILIALE'))
                                                content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">' + label.replace('_', ' ') + ':</b> </p><p class="float-right line-wrap">' + value + '</p></a>';
                                        });
                                        content += '</div>';
                                    });

                                    content += '</div></div>';
                                }
                            }else {
                                if(!(lastKey === 'FILIALE'))
                                    content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">' + lastKey.replace('_', ' ') + '</b> </p><p class="float-right line-wrap">' + lastValue + '</p></a>';
                            }
                        });
                        content += '</div>';
                    });
                    $("#viewListCollapsible").append( content );
                    $('#viewListCollapsible').collapsibleset();
                    $('#viewListCollapsible').collapsibleset('refresh');

                })
            } else {
                $('#viewListCollapsible').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
            }
        }
    );
}
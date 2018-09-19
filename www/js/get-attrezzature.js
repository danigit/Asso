'use strict';

/**
 * Funzione che ritorna la lista delle attrezzature dell'utente attualmente connesso
 */
function getAttrezzature() {
    var attrezzaturePromise = httpPost('php/ajax/get_attrezzature.php');

    attrezzaturePromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                var contratto = '';
                $.each(data[0], function (key, value) {
                    var content = '';
                    //prendo i valori degli elementi ritornati ragruppati per contratto
                    $.each(value, function (innerKey, innerValue) {
                        //se la chiave e contratto mostro solo il label con il nome del contratto
                        if(innerKey === 'contratto') {
                            content += "<div data-role='collapsible' data-inset='true'><h3>" + innerValue + "</h3>";
                            contratto = innerValue;
                        }else {
                            //creo una lista per ogni contratto e inserisco i dati del contratto
                            $.each(innerValue, function (lastKey, lastValue) {
                                var name = lastValue.replace(/LISTA_/g, '').replace('_', ' ');
                                content += '<a href="#' + name.toLowerCase() + '" class="ui-btn" data-name="' + contratto + '">' + name + '</li>';
                            });
                            content += '</div>';
                            $('#attrezzature-container').append(content).trigger('create');
                        }
                    })
                });

            } else {
                $('#attrezzature').append('<div class="center-text error-message"><span>'+ data.message + '</span></div>');
            }
        }
    );
}
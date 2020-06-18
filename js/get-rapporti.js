'use strict';

/**
 * Funzione che ritorna gli interventi e i rapporti di intervento dell'utente attualmente collegato
 */
function getRapporti() {
    //invio richiesta httpxml
    let contrattiPromise = httpPost('php/ajax/get_rapporti.php');
    $('#rapporti-list').empty();

    //interpreto risposta
    contrattiPromise.then(
        function(data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {

                $.each(data[0], function(key, value) {
                    //divido i rapporti per contratti
                    let label = $('<a href="#" data-inset="false" class="fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + key + '</a>');
                    $('#rapporti-list').append(label);
                    $.each(value, function(innerKey, innerValue) {

                        let content = "<div data-role='collapsible' class='rapporti-collapsible'><h3>" + innerKey + "</h3>";
                        //inserisco i rapporti del contratto attuale
                        let rapporti = Object.values(innerValue).reverse();

                        $.each(rapporti, function(lastKey, lastValue) {

                            content += '<a href="#" onclick="app.openPdf(\'' + lastValue.path + '.pdf\');" class="ui-btn margin-top-12 ' +
                                'box-shadow-bottom border-radius-10">Intervento del ' + lastValue.anno + '</a>';
                            //controllo se si tratta di un registro o meno
                            if (lastValue.registro === 'si')
                                content += '<a href="#" onclick="app.openPdf(\'' + lastValue.path + '-Registro.pdf\');" class="ui-btn ' +
                                'gray-text margin-top-12 border-radius-10 width-85 margin-auto border-1-gray">Registro del ' + lastValue.anno + '</a>';
                        });

                        content += '</div>';
                        $("#rapporti-list").append(content).collapsibleset('refresh');
                    })
                })
            } else {
                $('#rapporti').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
            }
        }
    );
}
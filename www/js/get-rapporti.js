'use strict';

/**
 * Funzione che ritorna gli interventi e i rapporti di intervento dell'utente attualmente collegato
 */
function getRapporti() {
    var contrattiPromise = httpPost('php/ajax/get_rapporti.php');

    contrattiPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {

                $.each(data[0], function (key, value) {
                    //divido i rapporti per contratti
                    var label = $('<a href="#" data-inset="false" class="fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + key + '</a>');
                    $('#rapporti-list').append(label);
                    $.each(value, function (innerKey, innerValue) {

                        var content = "<div data-role='collapsible'><h3>" + innerKey + "</h3>";
                        //inserisco i rapporti del contratto attuale
                        var rapporti = Object.values(innerValue).reverse();

                        $.each(rapporti, function (lastKey, lastValue) {

                            content += '<a href="#" onclick="app.openPdf(\'' + lastValue.path + '.pdf\');" class="ui-btn">Intervento del ' + lastValue.anno + '</a>';
                            //controllo se si tratta di un registro o meno
                            if(lastValue.registro === 'si')
                                content += '<a href="#" onclick="app.openPdf(\'' + lastValue.path + '-Registro.pdf\');" class="ui-btn gray-text">Registro del ' + lastValue.anno + '</a>';
                        });

                        content += '</div>';
                        $("#rapporti-list").append( content ).collapsibleset('refresh');
                    })
                })
            } else {
                $('#rapporti').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
            }
        }
    );
}
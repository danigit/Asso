'use strict';

/**
 * Funzione che ritorna gli interventi e i rapporti di intervento dell'utente attualmente collegato
 */
function getRapporti() {
    var contrattiPromise = httpPost('php/ajax/get_rapporti.php');

    contrattiPromise.then(
        function (data) {
            if (data.result) {

                $.each(data[0], function (key, value) {

                    var label = $('<a href="#" data-inset="false" class="fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + key + '</a>');
                    $('#rapporti-list').append(label);

                    $.each(value, function (innerKey, innerValue) {

                        var content = "<div data-role='collapsible'><h3>" + innerKey + "</h3>";
                        $.each(innerValue, function (lastKey, lastValue) {

                            //TODO da mettere il link al sito giusto
                            var path = LINK_SERVER_PDF + lastValue.path;
                            content += '<a href="#" onclick="app.open(\'' + path + '.pdf\');" class="ui-btn">Intervento del ' + lastValue.anno + '</a>';
                            if(lastValue.registro === 'si')
                                content += '<a href="#" onclick="app.open(\'' + path + '-Registro.pdf\');" class="ui-btn gray-text">Registro</span> del ' + lastValue.anno + '</a>';
                        });

                        content += '</div>';
                        $("#rapporti-list").append( content ).collapsibleset('refresh');
                    })
                })
            } else {
                $('#rapporti').append('<div class="center-text error-message"><span>Impossibile reccuperare le fatture</span></div>');
            }
        }
    );
}
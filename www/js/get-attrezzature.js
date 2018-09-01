'use strict';

/**
 * Funzione che ritorna la lista delle attrezzature dell'utente attualmente connesso
 */
function getAttrezzature() {
    var attrezzaturePromise = httpPost('php/ajax/get_attrezzature.php');

    attrezzaturePromise.then(
        function (data) {
            if (data.result) {
                var label = $('<a href="#" data-inset="false" class="margin-bottom-50 fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + data[0].contratto + '</a>');
                $('#attrezzature-container').append(label);
                var lista = '<ul data-role="listview" data-inset="false">';

                for(var i = 0; i < data[0]['lista'].length; i++){
                    var name = data[0]['lista'][i].replace(/LISTA_/g, '').replace('_', ' ');
                    lista += '<a href="#' + name.toLowerCase() + '" class="ui-btn">' + name + '</li>';
                }

                lista += '</ul>';
                $('#attrezzature-container').append(lista).trigger('create');
            } else {
                $('#attrezzature').append('<div class="center-text error-message"><span>Impossibile reccuperare le fatture</span></div>');
            }
        }
    );
}
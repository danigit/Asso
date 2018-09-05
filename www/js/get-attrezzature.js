'use strict';

/**
 * Funzione che ritorna la lista delle attrezzature dell'utente attualmente connesso
 */
function getAttrezzature() {
    var attrezzaturePromise = httpPost('php/ajax/get_attrezzature.php');

    attrezzaturePromise.then(
        function (data) {
            if (data.result) {
                var contratto = '';
                $.each(data[0], function (key, value) {
                    $.each(value, function (innerKey, innerValue) {
                        if(innerKey === 'contratto') {
                            var label = $('<a href="#" data-inset="false" class="margin-bottom-30 margin-top-50 fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + innerValue + '</a>');
                            contratto = innerValue;
                            $('#attrezzature-container').append(label);
                        }else {
                            var lista = '<ul data-role="listview" data-inset="false">';

                            $.each(innerValue, function (lastKey, lastValue) {
                                var name = lastValue.replace(/LISTA_/g, '').replace('_', ' ');
                                lista += '<a href="#' + name.toLowerCase() + '" class="ui-btn" data-name="' + contratto + '">' + name + '</li>';
                            });
                            lista += '</ul>';
                            $('#attrezzature-container').append(lista).trigger('create');
                        }
                    })
                });

            } else {
                $('#attrezzature').append('<div class="center-text error-message"><span>Impossibile reccuperare le fatture</span></div>');
            }
        }
    );
}
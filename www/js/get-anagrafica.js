'use strict';
/**
 * Funzione che reccupera l'anagrafica relativa all'utente attualmente connesso
 */
function getAnagrafica() {
    var anagraficaPromise = httpPost('php/ajax/get_anagrafica.php');

    anagraficaPromise.then(
        function (data) {
            if (data.result) {
                var anagrafica = '<ul data-role="listview" data-inset="true">';

                $.each(data[0], function (key, value) {
                    if(key === 'RAGIONE_SOCIALE' || key === 'INDIRIZZO_FATTURAZIONE' || key === 'INDIRIZZO_SPEDIZIONE'
                        || key === 'PARTITA_IVA' || key === 'CODICE_FISCALE' || key === 'EMAIL' || key === 'TELEFONO'
                        || key === 'CELLULARE') {
                        anagrafica += '<li data-role="list-divider">' + key.replace('_', ' ') + '</li>' +
                            '<h4 class="center-text text-transfor-none">' + value + '</h4>';
                    }
                });

                anagrafica += '</ul>';
                $('#anagrafica').append(anagrafica).trigger('create');
            } else {
                $('#anagrafica').append('<div class="center-text error-message"><span>Impossibile reccuperare l\'anagrafica</span></div>');
            }
        }
    );
}
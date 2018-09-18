'use strict';
/**
 * Funzione che reccupera l'anagrafica relativa all'utente attualmente connesso
 */
function getAnagrafica() {
    var anagraficaPromise = httpPost('php/ajax/get_anagrafica.php');

    anagraficaPromise.then(
        function (data) {
            //controllo se ci sono stati errori nella chiamato
            if (data.result) {
                //creo una lista per visualizzare i dati
                var anagrafica = '<ul data-role="listview" data-inset="true">';

                //inserisco i dati nella lista
                $.each(data[0], function (key, value) {
                    //prendo solo i dati che mi interessano
                    if(key === 'RAGIONE_SOCIALE' || key === 'INDIRIZZO_FATTURAZIONE' || key === 'INDIRIZZO_SPEDIZIONE'
                        || key === 'PARTITA_IVA' || key === 'CODICE_FISCALE' || key === 'EMAIL' || key === 'TELEFONO'
                        || key === 'CELLULARE') {
                        anagrafica += '<li><p class="float-left font-large"><b class="blue-text">' + key.replace("_", " ") + ':</b></p><br><br><p class="line-wrap font-medium">' + value + '</p></li>';
                    }
                });

                anagrafica += '</ul>';
                $('#anagrafica').append(anagrafica).trigger('create');
            } else {
                $('#anagrafica').append('<div class="center-text error-message"><span>' + data.message + '</span></div>');
            }
        }
    );
}
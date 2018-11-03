'use strict';
/**
 * Funzione che reccupera l'anagrafica relativa all'utente attualmente connesso
 */
function getAnagrafica() {
    let anagraficaPromise = httpPost('php/ajax/get_anagrafica.php');

    anagraficaPromise.then(
        function (data) {
            //controllo se ci sono stati errori nella chiamato
            if (data.result) {
                //creo una lista per visualizzare i dati
                let anagrafica = '<ul data-role="listview" data-inset="true" class="anagrafica-list-margin">';
                let select = '';

                //inserisco i dati nella lista
                $.each(data[0], function (key, value) {
                    //prendo solo i dati che mi interessano
                    if(key === 'RAGIONE_SOCIALE' || key === 'INDIRIZZO_FATTURAZIONE' || key === 'INDIRIZZO_SPEDIZIONE'
                        || key === 'PARTITA_IVA' || key === 'CODICE_FISCALE' || key === 'EMAIL' || key === 'TELEFONO'
                        || key === 'CELLULARE') {
                        var parsedKey = key.replace("_", " ");
                        anagrafica += '<li class="border-none"><p class="float-left font-large border-bottom-1-gray full-width center-text margin-bottom-none box-shadow-bottom paddint-bottom-5px"><b class="blue-text">' + parsedKey + '</b></p><p class="line-wrap font-medium center-text float-left width-95 margin-zero padding-9px background-lightgray border-radius-top-30">' + value + '</p></li>';
                        console.log('anagrafica: ' + key + '/' + value);
                        select += '<option>' + parsedKey + '</option>';
                    }
                });

                anagrafica += '</ul>';
                $('#anagraficaContainer').append(anagrafica).trigger('create');
            } else {
                $('#anagrafica').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
                $('#cambia-anagrafica-button').addClass('ui-disabled');
            }
        }
    );
}
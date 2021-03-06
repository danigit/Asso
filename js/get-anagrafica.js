'use strict';

/**
 * Funzione che reccupera l'anagrafica relativa all'utente attualmente connesso
 */
function getAnagrafica() {
    //invio richiesta httpxml
    let anagraficaPromise = httpPost('php/ajax/get_anagrafica.php');

    //interpreto risposta
    anagraficaPromise.then(
        function(data) {
            //controllo se ci sono stati errori nella chiamato
            if (data.result) {
                //creo una lista per visualizzare i dati
                let anagrafica = '<ul data-role="listview" data-inset="true" class="margin-anagrafica-list">';

                //cambio l'ordine di visualizzazione delle voci
                let anagraficaOrder = {
                    CODICE_UNIVOCO: data[0].CODICE_UNIVOCO,
                    RAGIONE_SOCIALE: data[0].RAGIONE_SOCIALE,
                    INDIRIZZO_FATTURAZIONE: data[0].INDIRIZZO_FATTURAZIONE,
                    INDIRIZZO_SPEDIZIONE: data[0].INDIRIZZO_SPEDIZIONE,
                    PARTITA_IVA: data[0].PARTITA_IVA,
                    CODICE_FISCALE: data[0].CODICE_FISCALE,
                    EMAIL: data[0].EMAIL,
                    TELEFONO: data[0].TELEFONO,
                    CELLULARE: data[0].CELLULARE
                };

                let select = '';

                $.each(anagraficaOrder, function(key, value) {
                    // if (value !== undefined && value !== "") {
                    let parsedKey = key.replace("key", " ");
                    anagrafica += '<a href="#" class="ui-btn fatture-item">' +
                        '<p class="green-text font-small margin-bottom-none left-text"><b>' + parsedKey + '</b></p>' +
                        '<p class="line-wrap font-large margin-top-2px margin-bottom-10 left-text">' + ((value === "" || value === undefined) ? '<span class="gray-text">' + NO_INFORMATION + '</span>' : value) + '</p> </a>';
                    // '<li class="border-none">' +
                    //     '<p class="float-left font-x-small border-bottom-1-gray full-width center-text margin-bottom-none border-radius-10 padding-tb-10px background-green ' +
                    //     'box-shadow-bottom paddint-bottom-5px"><b class="white-text font-small">' + parsedKey + '</b></p>' +
                    //     '<p class="font-large center-text float-left full-width margin-zero padding-lr-zero-tb-9px ' +
                    //     'border-radius-top-30">' + value + '</p></li>';
                    select += '<option>' + parsedKey + '</option>';
                    // } else {
                    //     let parsedKey = key.replace("key", " ");
                    //     anagrafica += '<a href="#" class="ui-btn fatture-item">' +
                    //         '<p class="green-text font-small margin-bottom-none left-text"><b>' + parsedKey + '</b></p>' +
                    //         '<p class="line-wrap font-large margin-top-2px margin-bottom-10 left-text">' + "" + '</p> </a>';
                    //     // '<li class="border-none">' +
                    //     //     '<p class="float-left font-x-small border-bottom-1-gray full-width center-text margin-bottom-none border-radius-10 padding-tb-10px background-green ' +
                    //     //     'box-shadow-bottom paddint-bottom-5px"><b class="white-text font-small">' + parsedKey + '</b></p>' +
                    //     //     '<p class="font-large center-text float-left full-width margin-zero padding-lr-zero-tb-9px ' +
                    //     //     'border-radius-top-30">' + value + '</p></li>';
                    //     select += '<option>' + parsedKey + '</option>';
                    // }

                });

                anagrafica += '</ul>';
                $('#anagraficaContainer').empty();
                $('#anagraficaContainer').append(anagrafica).trigger('create');
            } else {
                $('#anagrafica').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
                $('#cambia-anagrafica-button').addClass('ui-disabled');
            }
        }
    );
}
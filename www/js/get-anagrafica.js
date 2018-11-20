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

                let anagraficaOrder = {
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

                $.each(anagraficaOrder, function (key, value) {
                    if(value !== undefined && value !== ""){
                        let parsedKey = key.replace("_", " ");
                        anagrafica += '<li class="border-none">' +
                            '<p class="float-left font-large border-bottom-1-gray full-width center-text margin-bottom-none border-radius-10 padding-tb-10px background-green ' +
                            'box-shadow-bottom paddint-bottom-5px"><b class="white-text font-large">' + parsedKey + '</b></p>' +
                            '<p class="font-medium center-text float-left full-width margin-zero padding-lr-zero-tb-9px ' +
                            'border-radius-top-30">' + value + '</p></li>';
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

function getMotiv() {
    // $.get('http://localhost/DanielSurpanu_Asso/www/php/ajax/get_motiv.php', function (data) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost/DanielSurpanu_Asso/www/php/ajax/get_motiv.php',
    }).done(function (data) {
      console.log(data)
    }).fail(function () {
        console.log('fail');
    })
}


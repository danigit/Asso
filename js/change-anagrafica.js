'use strinct';

/**
 * Funzione che imposta la pagina di cambio anagrafica
 */
function setCambioAnagrafica() {
    let cambioAnagraficaForm = $('#cambioAnagraficaForm');

    cambioAnagraficaForm.empty();

    //invio richiesta httpxml
    let getChangeAnagraficaChangeValues = httpPost('php/ajax/get_anagrafica.php');

    //interpreto il risultato della chiamata
    getChangeAnagraficaChangeValues.then(
        function(data) {
            //controllo se ci sono stati errori nella chiamato
            if (data.result) {
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

                $.each(anagraficaOrder, function(key, value) {
                    if (value !== undefined && value !== "") {
                        let field = $('<label for="' + key + '" class="center-text bold-text border-bottom-1-gray font-small background-green border-radius-10 padding-tb-10px white-text ' +
                            '">' + key.replace("_", " ") + '</label>' +
                            '<input type="text" class="font-medium" name="' + key + '" id="' + key + '" placeholder="' + value + '">');
                        cambioAnagraficaForm.append(field).trigger('create');
                    } else {
                        let field = $('<label for="' + key + '" class="center-text bold-text border-bottom-1-gray font-small background-green border-radius-10 padding-tb-10px white-text ' +
                            '">' + key.replace("_", " ") + '</label>' +
                            '<input type="text" class="font-medium" name="' + key + '" id="' + key + '" placeholder="' + "" + '">');
                        cambioAnagraficaForm.append(field).trigger('create');
                    }
                });
            } else {
                $('#cambioAnagrafica').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
            }
        }
    );
}

//invio l'email di notifica per il cambiamento dell'anagrafica
$('#BtnInvia').on('click', function() {
    let emailForm = new FormData();
    let count = 0;
    let formValue = '';
    let dbJson = {};
    let jsonKey;
    let jsonValue;

    sendEmail($('#error-change-anagrafica-popup'), 'start', 'Sto inviando richiesta di cambio anagrafica...');

    //prendo tutti i valori da mandare
    $('#cambioAnagraficaForm').children().each(function(key, value) {
        let elem = $(value);

        if (elem.prop('tagName') === 'LABEL') {
            formValue = '<b>' + elem.text() + '</b>';
            jsonKey = elem.text();
        }

        if (elem.prop('tagName') === 'DIV') {
            if (elem.find('input').val() === "") {
                formValue += ': ' + elem.find('input').attr('placeholder');
                jsonValue = elem.find('input').attr('placeholder');
            } else {
                formValue += ': ' + elem.find('input').val();
                jsonValue = elem.find('input').val();
            }

            emailForm.append('' + count, formValue);
            dbJson[jsonKey] = jsonValue;
            count++;
        }
    });

    //controllo se c'e' almeno un valore da mandare
    if (count !== 0) {
        emailForm.append('count', "" + count);
        emailForm.append('dbJson', JSON.stringify(dbJson));

        //invio richiesta httpxml
        let changeAnagraficaPromise = httpPost('php/ajax/send_email_cambio_anagrafica.php', emailForm);

        //interpreto il risulatato della chiamata
        changeAnagraficaPromise.then(
            function(data) {
                //controllo se ci sono stati errori nella chiamato
                if (data.result) {
                    $('#inviaCambioAnagraficaDati').addClass('ui-disabled');

                    sendEmail($('#error-change-anagrafica-popup'), 'stop');

                    //notifico la spedizione della mail
                    showError($('#error-change-anagrafica-popup'), 'Email spedita', 'La richiesta di cambio anagrafica è stata ' +
                        'innoltrata con successo', 'success');

                    setTimeout(function() {
                        window.location.href = 'content.php';
                    }, 1700);
                } else {
                    showError($('#error-change-anagrafica-popup'), 'Email non spedita', 'Impossibile innoltrare la richiesta di ' +
                        'cambio anagrafica. Riprovare più tardi', 'error')
                }
            }
        );
    }
});
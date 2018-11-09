'use strinct';

function setCambioAnagrafica() {
    let cambioAnagraficaForm = $('#cambioAnagraficaForm');

    cambioAnagraficaForm.empty();
    let getChangeAnagraficaChangeValues = httpPost('php/ajax/get_anagrafica.php');

    getChangeAnagraficaChangeValues.then(
        function (data) {
            //controllo se ci sono stati errori nella chiamato
            if (data.result) {
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


                $.each(anagraficaOrder, function (key, value) {
                    if(value !== undefined && value !== "") {
                        let field = $('<label for="' + key + '" class="center-text bold-text border-bottom-1-gray font-large ' +
                                'box-shadow-bottom">' + key.replace("_", " ") + '</label>' +
                            '<input type="text" name="' + key + '" id="' + key + '" placeholder="' + value + '">');
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
$('#inviaCambioAnagraficaDati').on('click', function () {
    let emailForm = new FormData();
    let count = 0;
    let formValue = '';

    sendEmail($('#error-change-anagrafica-popup'), 'start');

    //prendo tutti i valori da mandare
    $('#cambioAnagraficaForm').children().each(function (key, value) {
        let elem = $(value);

        if (elem.prop('tagName') === 'LABEL'){
            formValue = '<b>' + elem.text() + '</b>'
        }

        if (elem.prop('tagName') === 'DIV') {
            if (elem.find('input').val() === "") {
                formValue += ': ' + elem.find('input').attr('placeholder');
            }else{
                formValue += ': ' + elem.find('input').val();
            }

            emailForm.append('' + count, formValue);
            count++;
        }
    });

    //controllo se c'e' almeno un valore da mandare
    if (count !== 0) {
        emailForm.append('count', "" + count);

        let changeAnagraficaPromise = httpPost('php/ajax/send_email_cambio_anagrafica.php', emailForm);

        changeAnagraficaPromise.then(
            function (data) {
                //controllo se ci sono stati errori nella chiamato
                if (data.result) {
                    $('#inviaCambioAnagraficaDati').addClass('ui-disabled');

                    sendEmail($('#error-change-anagrafica-popup'), 'stop');

                    showError($('#error-change-anagrafica-popup'), 'Email spedita', 'La richiesta di cambio anagrafica è stata ' +
                        'innoltrata con successo', 'success');

                    setTimeout(function () {
                        window.location.href = 'content.php';
                    }, 1700);
                }else{
                    showError($('#error-change-anagrafica-popup'), 'Email non spedita', 'Impossibile innoltrare la richiesta di ' +
                        'cambio anagrafica. Riprovare più tardi', 'error')
                }
            }
        );
    }
});

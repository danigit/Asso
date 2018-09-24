'use strinct';

function setCambioAnagrafica() {

    let selectionAnagrafica;
    let changeAnagraficaSelection = $('#changeAnagraficaSelection');
    let changeAnagraficaMessaggioErrore = $('#cambioAnagraficaMessaggioErrore');

    let getChangeAnagraficaChangeValues = httpPost('php/ajax/get_anagrafica.php');

    getChangeAnagraficaChangeValues.then(
        function (data) {
            //controllo se ci sono stati errori nella chiamato
            if (data.result) {

                let select = '';

                //inserisco le option nella select
                $.each(data[0], function (key, value) {
                    //prendo solo i dati che mi interessano
                    if(key === 'RAGIONE_SOCIALE' || key === 'INDIRIZZO_FATTURAZIONE' || key === 'INDIRIZZO_SPEDIZIONE'
                        || key === 'PARTITA_IVA' || key === 'CODICE_FISCALE' || key === 'EMAIL' || key === 'TELEFONO'
                        || key === 'CELLULARE') {
                        select += '<option>' + key.replace("_", " "); + '</option>';
                    }
                });

                changeAnagraficaSelection.append(select);
            } else {
                $('#cambioAnagrafica').append('<div class="center-text error-message"><span>' + data.message + '</span></div>');
            }
        }
    );

    //controllo il cambio della option selezionata
    changeAnagraficaSelection.on('change', function () {
        selectionAnagrafica = this.value;

        changeAnagraficaMessaggioErrore.find('p').remove();
        $('#inviaCambioAnagraficaDati').removeClass('ui-disabled');
        //controllo se il form c'e' e se c'e' lo rimuovo
        if ($('#valoreAnagraficaForm').length) {
            $('#valoreAnagraficaForm').remove();
        }

        //controllo se la voce selezionata e' diversa da quella di default e faccio comparire la textfield
        if (selectionAnagrafica !== 'Seleziona una voce...') {
            let inputForm = '<form id="valoreAnagraficaForm"><input type="text" name="selectionValue" id="selectionValue" placeholder="Inserisci valore ' + selectionAnagrafica + '"></form>';
            $('#valoreAnagrafica').append(inputForm).trigger('create');
        } else {
            //se e selezionata la vode di default rimuovo la textfield
            if (valoreAnagraficaForm.length) {
                valoreAnagraficaForm.remove();
            }
        }

    });

    //gestisco il click sul pulsante aggiungi modifica
    $('#aggiungiModifica').on('click', function () {
        let itemToInsert = $('#selectionValue').val();
        let isInserted = false;

        changeAnagraficaMessaggioErrore.empty();

        //controllo se l'inputfield non e' vuoto
        if (itemToInsert !== '' && itemToInsert !== undefined) {
            $('#cambiaAnagraficaList li').each(function () {
                //controllo se c'e' un campo uguale a questo gia' inserito, se vero non inserisco
                if ($(this).find('[data-name="nameOfField"]').text() === selectionAnagrafica + ":") {
                    isInserted = true;
                }
            });

            //campo non esiste quindi inserisco, altrimenti mostro messaggio di errore
            if (!isInserted)
                $('#cambiaAnagraficaList').append('<li class="ui-disabled"><p data-name="nameOfField" class="float-left font-large"><b class="blue-text">' + selectionAnagrafica + ':</b></p><br><br><p id="newValueOfField" class="line-wrap font-medium">' + itemToInsert + '</p></li>')
            else {
                changeAnagraficaMessaggioErrore.append('<p class="center-text error-message text-shadow-none white-text">Valore gia\' inserito</p>');
            }
        }else{
            changeAnagraficaMessaggioErrore.append('<p class="center-text error-message text-shadow-none white-text">Selezionare prima un valore da aggiungere</p>');
        }

        //controllo se il form c'e' e se c'e' lo rimuovo
        if ($('#valoreAnagraficaForm').length) {
            $('#valoreAnagraficaForm').remove();
        }
    });

    //elimino tutti i dati inseriti e ripristino la pagina allo stato iniziale
    $('#cancellaModifica').on('click', function () {
        $('#cambiaAnagraficaList').empty();
        $('#valoreAnagraficaForm').empty();
        changeAnagraficaMessaggioErrore.empty();
        selectDefaultForSelection('changeAnagraficaSelection');
    });

    //invio l'email di notifica per il cambiamento dell'anagrafica
    $('#inviaCambioAnagraficaDati').on('click', function () {
        $('#inviaCambioAnagraficaDati').addClass('ui-disabled');
        let emailForm = new FormData();
        let count = 0;

        //prendo tutti i valori da mandare
        $('#cambiaAnagraficaList li').each(function (key, value) {
            let label = '<b>' + value.firstChild.textContent + '</b> ' + value.lastChild.textContent;

            console.log(value.firstChild.textContent);
            console.log(value.lastChild.textContent);
            emailForm.append(key, label);
            count++;
        });

        //controllo se c'e' almeno un valore da mandare
        if (count !== 0) {
            emailForm.append('count', "" + count);

            let changeAnagraficaPromise = httpPost('php/ajax/send_email_cambio_anagrafica.php', emailForm);

            changeAnagraficaPromise.then(
                function (data) {
                    //controllo se ci sono stati errori nella chiamato
                    if (data.result) {
                        //rimuovo elementi inseriti e notifico l'invio della mail
                        $('#cambiaAnagraficaList').empty();
                        changeAnagraficaMessaggioErrore.empty();
                        selectDefaultForSelection('changeAnagraficaSelection');
                        $('#cambioAnagraficaMessaggioErrore').append('<p class="center-text success-message text-shadow-none white-text">Email inviata con successo</p>');
                    }else{
                        $('#cambioAnagraficaMessaggioErrore').append('<p class="center-text error-message text-shadow-none white-text">Impossibile inviare l\'email in questo momento. Riprovare più tardi</p>');
                    }
                }
            );
        } else {
            $('#cambioAnagraficaMessaggioErrore').append('<p class="center-text error-message text-shadow-none white-text">Nessun data da inviare</p>');

        }
    });
}

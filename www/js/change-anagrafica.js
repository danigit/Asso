'use strinct';

function setCambioAnagrafica() {

    let selectionAnagrafica;
    let changeAnagraficaSelection = $('#changeAnagraficaSelection');
    let changeAnagraficaMessaggioErrore = $('#cambioAnagraficaMessaggioErrore');
    let changeAnagraficaList = $('#cambiaAnagraficaList');
    let valoreAnagrafica = $('#valoreAnagrafica');

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
                $('#cambioAnagrafica').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
            }
        }
    );

    //controllo il cambio della option selezionata
    changeAnagraficaSelection.on('change', function () {
        selectionAnagrafica = this.value;

        changeAnagraficaMessaggioErrore.find('p').remove();
        $('#aggiungiModifica').removeClass('ui-disabled');
        //controllo se il form c'e' e se c'e' lo rimuovo
        if ($('#valoreAnagraficaForm').length) {
            $('#valoreAnagraficaForm').remove();
        }

        //controllo se la voce selezionata e' diversa da quella di default e faccio comparire la textfield
        if (selectionAnagrafica !== 'Seleziona una voce...') {
            let inputForm = '<form id="valoreAnagraficaForm"><input type="text" name="selectionValue" id="selectionValue" class="font-medium inset-shadow-blue padding-9px" placeholder="Inserisci valore ' + selectionAnagrafica + '"></form>';
            valoreAnagrafica.append(inputForm).trigger('create');
            $('#selectionValue').focus();
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
            if (!isInserted) {
                selectDefaultForSelection('changeAnagraficaSelection');
                $('#valoreAnagraficaForm').remove();
                $('#cancellaModifica').removeClass('ui-disabled');
                $('#inviaCambioAnagraficaDati').removeClass('ui-disabled');
                changeAnagraficaList.append('<li class=""><p data-name="nameOfField" class="float-left font-large border-bottom-1-gray full-width center-text margin-bottom-none box-shadow-bottom paddint-bottom-5px"><b class="blue-text">' + selectionAnagrafica + '</b></p><br><br><p id="newValueOfField" class="line-wrap font-medium center-text float-left width-95 margin-zero padding-9px background-lightgray border-radius-top-30">' + itemToInsert + '</p></li>')
            }else {
                showError($('#error-change-anagrafica-popup'), 'CAMBIO ANAGRAFICA', 'Campo già presente', 'error')
            }
        }else{
            showError($('#error-change-anagrafica-popup'), 'CAMBIO ANAGRAFICA', 'Selezionare almeno un campo da modificare e inserisci un valore', 'error')
        }

        //controllo se il form c'e' e se c'e' lo rimuovo
        // if ($('#valoreAnagraficaForm').length) {
        //     selectDefaultForSelection('changeAnagraficaSelection');
        //     $('#valoreAnagraficaForm').remove();
        // }
    });

    //elimino tutti i dati inseriti e ripristino la pagina allo stato iniziale
    $('#cancellaModifica').on('click', function () {
        changeAnagraficaList.empty();
        $('#valoreAnagraficaForm').empty();
        selectDefaultForSelection('changeAnagraficaSelection');
        $('#aggiungiModifica').addClass('ui-disabled');
        $('#cancellaModifica').addClass('ui-disabled');
        $('#inviaCambioAnagraficaDati').addClass('ui-disabled');
    });

    //invio l'email di notifica per il cambiamento dell'anagrafica
    $('#inviaCambioAnagraficaDati').on('click', function () {
        let emailForm = new FormData();
        let count = 0;

        sendEmail($('#error-change-anagrafica-popup'), 'start');

        //prendo tutti i valori da mandare
        $('#cambiaAnagraficaList li').each(function (key, value) {
            let label = '<b>' + value.firstChild.textContent + '</b> ' + value.lastChild.textContent;

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
                        sendEmail($('#error-change-anagrafica-popup'), 'stop');
                        //rimuovo elementi inseriti e notifico l'invio della mail
                        changeAnagraficaList.empty();
                        changeAnagraficaMessaggioErrore.empty();
                        selectDefaultForSelection('changeAnagraficaSelection');
                        showError($('#error-change-anagrafica-popup'), 'Email spedita', 'La richiesta di cambio anagrafica è stata innoltrata con successo', 'success');
                        setTimeout(function () {
                            window.location.href = 'content.php';
                        }, 1500);
                        $('#inviaCambioAnagraficaDati').addClass('ui-disabled');
                    }else{
                        showError($('#error-change-anagrafica-popup'), 'Email non spedita', 'Impossibile innoltrare la richiesta di cambio anagrafica. Riprovare più tardi', 'error')
                    }
                }
            );
        } else {
            showError($('#error-change-anagrafica-popup'), 'Cambio anagrafica', 'Selezionare almeno un campo da modificare', 'error')
        }
    });
}

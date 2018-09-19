var selected;

$('#changeAnagraficaSelection').on('change', function (e) {
    selected = this.value;

    $('#cambioAnagraficaMessaggioErrore p').remove();
    if(selected !== 'Seleziona una voce...') {
        var inputForm = '<form id="valoreAnagraficaForm"><input type="text" name="selectionValue" id="selectionValue" placeholder="Inserisci valore ' + selected + '"></form>';
        $('#valoreAnagrafica').append(inputForm).trigger('create');
    }else {
        if ($('#valoreAnagraficaForm').length) {
            ($('#valoreAnagraficaForm')).remove();
        }
    }

});

$('#aggiungiModifica').on('click', function () {
    console.log("modifica aggiunta");
    var itemToInsert = $('#selectionValue').val();
    var isInserted = false;
    console.log('selectionValue ' + itemToInsert);
    if(itemToInsert !== '') {
        $('#cambiaAnagraficaList li').each(function () {
            if($(this).find('[data-name="nameOfField"]').text() === selected + ":"){
                isInserted = true;
            }
        });
        if(!isInserted)
            $('#cambiaAnagraficaList').append('<li class="ui-disabled"><p data-name="nameOfField" class="float-left font-large"><b class="blue-text">' + selected + ':</b></p><br><br><p id="newValueOfField" class="line-wrap font-medium">' + itemToInsert + '</p></li>')
        else {
            $('#cambioAnagraficaMessaggioErrore').append('<p class="center-text error-message text-shadow-none white-text">Valore gia\' inserito</p>');
        }
    }
    if ($('#valoreAnagraficaForm').length) {
        ($('#valoreAnagraficaForm')).remove();
    }
});

$('#cancellaModifica').on('click', function () {
    $('#cambiaAnagraficaList').empty();
});

$('#inviaCambioAnagraficaDati').on('click', function () {
    var emailForm = new FormData();
    var count = 0;
    $('#cambiaAnagraficaList li').each(function (elem) {
        emailForm.append(elem, $(this).text());
        count++;
    });

    if(count !== 0) {
        emailForm.append('count', "" + count);

        console.log('mail inviata');
        var changeAnagraficaPromise = httpPost('php/ajax/send_email.php', emailForm);

        changeAnagraficaPromise.then(
            function (data) {
                //controllo se ci sono stati errori nella chiamato
                if (data.result) {

                }
            }
        );
    }else {
        $('#cambioAnagraficaMessaggioErrore').append('<p class="center-text error-message text-shadow-none white-text">Nessun data da inviare</p>');

    }
});
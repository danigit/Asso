var selected;
$('#changeAnagraficaSelection').on('change', function (e) {
    selected = this.value;
    console.log(selected);

    var inputForm = '<form id="valoreAnagraficaForm"><label for="selectionValue">Inserisci valore per ' + selected + ':</label>' +
        '<input type="text" name="selectionValue" id="selectionValue"></form>';
    $('#valoreAnagrafica').append(inputForm).trigger('create');
});

$('#aggiungiModifica').on('click', function () {
    console.log("modifica aggiunta");
    var itemToInsert = $('#selectionValue').val();
    console.log('selectionValue ' + itemToInsert);
    if(itemToInsert !== '')
        $('#cambiaAnagraficaList').append('<li class="ui-disabled"><p class="float-left font-large"><b class="blue-text">' + selected + ':</b></p><br><br><p class="line-wrap font-medium">' + itemToInsert + '</p></li>')

    if ($('#valoreAnagraficaForm').length) {
        ($('#valoreAnagraficaForm')).remove();
    }
});

$('#inviaCambioAnagraficaDati').on('click', function () {

});
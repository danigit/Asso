'use strict';

$('#richiestaAssistenzaMotivoSelect').on('change', function (e) {
    var selectedMotivo = this.value;
    if(selectedMotivo === "Altro..."){
        var altroForm = '<form id="valoreAltroForm"><input type="text" name="motivoAltroValue" id="motivoAltroValue" placeholder="Inserire il motivo della richiesta di assistenza">';
        $('#altro-selection').append(altroForm).trigger('create');
    }else if(selectedMotivo === "Seleziona un motivo..." && $('#valoreAltroForm').length){
        $('#valoreAltroForm').remove();
    }

    var contrattiPromise = httpPost('php/ajax/get_contratti.php');

    contrattiPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {

                $.each(data[0], function (key, value) {
                    $.each(value, function (innerKey, innerValue) {
                        $('#richiestaAssistenzaContrattoSelect').append('<option>' + innerValue.nome + '</option>');
                    });
                })
            }
        }
    );

    $('#richiestaAssistenzaContrattoSelect').removeClass('ui-disabled');
    $('#richiestaAssistenzaContrattoSelect').selectmenu('refresh');

});

$('#richiestaAssistenzaContrattoSelect').on('change', function (e) {
    var selectedContratto = this.value;

    var richiestaAssistenzaContrattiPromise = httpPost('php/ajax/get_attrezzature.php');
    $('#resultForCheck').empty();

    richiestaAssistenzaContrattiPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                $('#richiestaAssistenzaFilialeSelect').children('option:not(:first)').remove();
                $('#richiestaAssistenzaFilialeSelect option:eq(0)').prop('selected', true);
                $('#richiestaAssistenzaFilialeSelect').selectmenu('refresh');

                $.each(data[0], function (key, value) {
                    if(value.contratto === selectedContratto){
                        var richiestaAssistenzaPromiseForm = new FormData();
                        richiestaAssistenzaPromiseForm.append('contratto', value.contratto);
                        var richiestaAssistenzaAttrezzaturePromise = httpPost("php/ajax/get_filiale_per_contratto.php", richiestaAssistenzaPromiseForm);
                        richiestaAssistenzaAttrezzaturePromise.then(
                            function (data) {
                                if(data.result){
                                    $.each(data.filiali, function (key, value) {
                                        $('#richiestaAssistenzaFilialeSelect').append('<option>' + value + '</option>');
                                    })
                                }
                            }
                        )
                    }
                });
            }
        }
    );

    $('#richiestaAssistenzaFilialeSelect').removeClass('ui-disabled');
    $('#richiestaAssistenzaFilialeSelect').selectmenu('refresh');
});

$('#richiestaAssistenzaFilialeSelect').on('change', function (e) {
    var selectedFiliale = this.value;
    var contratto = $('#richiestaAssistenzaContrattoSelect').val();
    var content = '';
    var filialeForm = new FormData();

    $('#resultForCheck').empty();
    $('#inviaRichiestaAssistenzaDati').removeClass('ui-disabled');

    filialeForm.append('contratto', contratto);
    filialeForm.append('filiale', selectedFiliale);

    var richiestaAssistenzaFilialePromise = httpPost('php/ajax/get_attrezzature_per_filiale.php', filialeForm);

    richiestaAssistenzaFilialePromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                console.log(data);
                content += '<p class="elementi-da-selezionare"> Seleziona gli elementi che richiedono assistenza</p>';
                $.each(data[0], function (key, value) {

                    $.each(value, function (innerKey, innerValue) {

                        content += "<div id='" + innerKey + "' data-role='collapsible' data-inset='true'><h3>" + innerKey + "</h3>";
                        if($.isArray(innerValue)) {
                            $.each(innerValue, function (lastKey, lastValue) {
                                console.log('lastvalue: ' + lastValue.MATRICOLA);
                                if (lastValue.MATRICOLA !== undefined)
                                    content += '<input type="checkbox" name="' + lastValue.MATRICOLA + '" id="' + lastValue.MATRICOLA + '"><label for="' + lastValue.MATRICOLA + '">Matricola: ' + lastValue.MATRICOLA + ' / Nr: ' + lastValue.PROGRESSIVO + '</label>';
                                else
                                    content += '<input type="checkbox" name="' + lastValue.PROGRESSIVO + '" id="' + lastValue.PROGRESSIVO + '"><label for="' + lastValue.PROGRESSIVO + '">Progressivo: ' + lastValue.PROGRESSIVO + '</label>';
                            });
                        }else {
                            if (innerValue.MATRICOLA !== undefined)
                                content += '<input type="checkbox" name="' + innerValue.MATRICOLA + '" id="' + innerValue.MATRICOLA + '"><label for="' + innerValue.MATRICOLA + '">Matricola: ' + innerValue.MATRICOLA + ' / Nr: ' + innerValue.PROGRESSIVO + '</label>';
                            else
                                content += '<input type="checkbox" name="' + innerValue.PROGRESSIVO + '" id="' + innerValue.PROGRESSIVO + '"><label for="' + innerValue.PROGRESSIVO + '">Progressivo: ' + innerValue.PROGRESSIVO + '</label>';
                        }
                        content += '</div>';
                    })
                })

                $('#resultForCheck').append(content).trigger('create');
                $('#noteAggiuntive').append('<label class="note-aggiuntive-label" for="areaNoteAggiuntive">Note aggiuntive: </label>' +
                    '<textarea name="areaNoteAggiuntive" id="areaNoteAggiuntive" placeholder="Lasciare vuoto se non ci sono note aggiuntive"></textarea>').trigger('create');
            }
        }
    );
});
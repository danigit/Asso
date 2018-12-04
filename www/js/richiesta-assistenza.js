'use strict';


let richiestaAssistenzaContrattoSelect = $('#richiestaAssistenzaContrattoSelect');
let richiestaAssistenzaFilialeSelect = $('#richiestaAssistenzaFilialeSelect');
let noteAggiuntive = $('#noteAggiuntive');
let resultForCheck = $('#resultForCheck');
let inviaRichiestaAssistenzaDati = $('#inviaRichiestaAssistenzaDati');

function richiestaAssistenza() {
    resetPageFields();

    $('#richiestaAssistenzaMotivoSelect').children().slice(2).remove();
    $('#richiestaAssistenzaMotivoSelect option:eq(0)').prop('selected', true);
    $('#richiestaAssistenzaMotivoSelect').selectmenu('refresh');

    let motivoPromise = httpPost('php/ajax/get_motiv.php');

    motivoPromise.then(
        function (data) {
            if (data.result){
                $.each(data.motivs, function (key, value) {
                    console.log(value.descrizione);
                    $('#richiestaAssistenzaMotivoSelect').append('<option>' + value.descrizione + '</option>');
                })
            }
        }
    )
}

//gestisco il cambio del motivo
$('#richiestaAssistenzaMotivoSelect').on('change', function () {
    let selectedMotivo = this.value;

    // resetPageFields();
    getContrattiAssistenza();

    if (selectedMotivo === "Altro...") {
        let altroForm = '<form id="valoreAltroForm"><input type="text" name="motivoAltroValue" id="motivoAltroValue" placeholder="Inserire il motivo della richiesta di assistenza">';
        $('#altro-selection').append(altroForm).trigger('create');
    }else{
        $('#altro-selection').empty();
    }

    richiestaAssistenzaContrattoSelect.removeClass('ui-disabled');
    richiestaAssistenzaContrattoSelect.selectmenu('refresh');
});

//gestisto il cambio del contratto
$('#richiestaAssistenzaContrattoSelect').on('change', function (e) {
    let selectedContratto = this.value;


    $('.info-tecnico').empty();
    $('#noteAggiuntive').empty();
    $('#resultForCheck').empty();
    $('#inviaRichiestaAssistenzaDati').addClass('ui-disabled');
    resetSelection('richiestaAssistenzaFilialeSelect');

    getFilialePerContratto(selectedContratto);

    richiestaAssistenzaFilialeSelect.removeClass('ui-disabled');
    richiestaAssistenzaFilialeSelect.selectmenu('refresh');
});

function getFilialePerContratto(selectedContratto){
    let richiestaAssistenzaPromiseForm = new FormData();
    richiestaAssistenzaPromiseForm.append('contratto', selectedContratto);

    let richiestaAssistenzaAttrezzaturePromise = httpPost("php/ajax/get_filiale_per_contratto.php", richiestaAssistenzaPromiseForm);
    richiestaAssistenzaAttrezzaturePromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                console.log(data);
                $.each(data.filiali, function (key, value) {
                    if (key === 'tecnico') {
                        $('.info-tecnico').append('<p class="center-text"><span class="float-left margin-left-20px"><b class="red-text font-large">Tecnico:</b></span><span class="float-right margin-right-10px"> ' + value + '</span></p>');
                    }else if (key === 'telefono_tecnico') {
                        $('.info-tecnico').append('<br> <p><span class="float-left margin-left-20px"><b class="red-text font-large">Cellulare:</b></span><span class="float-right margin-right-10px"> ' + value + '</span></p>')
                    }else if (key === 'email_tecnico'){
                        $('.info-tecnico').append('<br> <p><span class="float-left margin-left-20px"><b class="red-text font-large">Email:</b></span><span class="float-right margin-right-10px email"> ' + value + '</span></p>')
                    }else {
                        $('#richiestaAssistenzaFilialeSelect').append('<option>' + value + '</option>');
                    }
                })
            }else {
                $('#assistenzaMessaggioErrore').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
            }
        }
    );
}

//gestisco il cambio della filiale
$('#richiestaAssistenzaFilialeSelect').on('change', function (e) {
    let selectedFiliale = this.value;
    let contratto = $('#richiestaAssistenzaContrattoSelect').val();
    let content = '';
    let filialeForm = new FormData();

    $('#noteAggiuntive').empty();
    $('#resultForCheck').empty();

    filialeForm.append('contratto', contratto);
    filialeForm.append('filiale', selectedFiliale);

    let richiestaAssistenzaFilialePromise = httpPost('php/ajax/get_attrezzature_per_filiale.php', filialeForm);
    richiestaAssistenzaFilialePromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                content += '<p class="elementi-da-selezionare font-medium border-bottom-1-red width-85"> Seleziona gli elementi che richiedono assistenza</p>';
                $.each(data[0], function (key, value) {
                    $.each(value, function (innerKey, innerValue) {
                        //aggiungo la categoria dell'attrezzatura
                        content += "<div id='" + innerKey + "' data-role='collapsible' data-inset='true' class='richiestaAssistenza-collapsible'><h3>" + innerKey + "</h3>";
                        //controllo se ci sono piu' di un elemento da visualizzare
                        if ($.isArray(innerValue)) {
                            //inserisco tutti gli elemeni
                            $.each(innerValue, function (lastKey, lastValue) {
                                //controllo se l'elemento ha una matricola
                                if (lastValue.MATRICOLA !== undefined)
                                    content += '<input type="checkbox" name="' + lastValue.MATRICOLA + '" id="' + lastValue.MATRICOLA + '"><label for="' + lastValue.MATRICOLA + '">Matricola: ' + lastValue.MATRICOLA + ' / Nr: ' + lastValue.PROGRESSIVO + '</label>';
                                else
                                    content += '<input type="checkbox" name="' + lastValue.PROGRESSIVO + '" id="' + lastValue.PROGRESSIVO + '"><label for="' + lastValue.PROGRESSIVO + '">Progressivo: ' + lastValue.PROGRESSIVO + '</label>';
                            });
                        } else {
                            if (innerValue.MATRICOLA !== undefined)
                                content += '<input type="checkbox" name="' + innerValue.MATRICOLA + '" id="' + innerValue.MATRICOLA + '"><label for="' + innerValue.MATRICOLA + '">Matricola: ' + innerValue.MATRICOLA + ' / Nr: ' + innerValue.PROGRESSIVO + '</label>';
                            else if( innerValue.PROGRESSIVO !== undefined)
                                content += '<input type="checkbox" name="' + innerValue.PROGRESSIVO + '" id="' + innerValue.PROGRESSIVO + '"><label for="' + innerValue.PROGRESSIVO + '">Progressivo: ' + innerValue.PROGRESSIVO + '</label>';
                            // else
                            //     content += '<input type="checkbox" name="' + innerValue.PROGRESSIVO + '" id="' + innerValue.PROGRESSIVO + '"><label for="' + innerValue.PROGRESSIVO + '">Progressivo: ' + innerValue. + '</label>';
                        }
                        content += '</div>';
                    })
                });

                $('#resultForCheck').append(content).trigger('create');
                // $('#noteAggiuntive').append('<label class="note-aggiuntive-label center-text blue-text border-bottom-1-red" for="areaNoteAggiuntive">Note aggiuntive </label>' +
                $('#noteAggiuntive').append('<textarea name="areaNoteAggiuntive" class="box-shadow-bottom" id="areaNoteAggiuntive" placeholder="Lasciare vuoto se non ci sono note aggiuntive"></textarea>').trigger('create');

                inviaRichiestaAssistenzaDati.removeClass('ui-disabled');
            }else {
                $('#assistenzaMessaggioErrore').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
            }
        }
    );
});

$('#inviaRichiestaAssistenzaDati').on('click', function () {
    let i = 1;
    let isEmpty = true;
    let isMotiv = true;
    let motivo = $('#richiestaAssistenzaMotivoSelect').val();
    let contratto = $('#richiestaAssistenzaContrattoSelect').val();
    let filiale = $('#richiestaAssistenzaFilialeSelect').val();
    let tecnico = $('.info-tecnico .email').text();

    console.log('tecnico value: ' + tecnico);
    let noteAggiuntive = $('#areaNoteAggiuntive').val();

    if(motivo === 'Altro...') {
        if ($('#motivoAltroValue').val() === "") {
            isMotiv = false;
        }else {
            motivo = $('#motivoAltroValue').val();
        }
    }

    if(motivo !== "Seleziona un motivo..." && contratto !== "Seleziona un contratto..." && filiale !== "Seleziona una filiale...") {

        let checked = {"Motivo": motivo, "Contratto": contratto, "Filiale": filiale, "Email": tecnico, 'attrezzature': {}, "Note aggiuntive": noteAggiuntive};
        let assistenzaFormData = new FormData();

        $.each($('#resultForCheck').children(), function (key, value) {

            if (value.tagName === 'DIV') {
                let tipoAttrezzatura = $(value).attr('id');

                checked.attrezzature[tipoAttrezzatura] = {};
                i = 1;

                $.each($(value).children(), function (innerKey, innerValue) {
                    if (innerValue.tagName === 'DIV') {

                        $.each($(innerValue).children(), function (lastKey, lastValue) {
                            let input = $(lastValue).find('input');
                            if ($(input).is(':checked')) {
                                //TODO Controllare tutti i tipi esistenti
                                if(tipoAttrezzatura === 'ESTINTORE' || tipoAttrezzatura === 'PORTA')
                                    checked.attrezzature[tipoAttrezzatura]['Matricola ' + tipoAttrezzatura.toLowerCase() + ' ' + i++] = ' ' + $(input).attr('id');
                                else if (tipoAttrezzatura === 'LUCE' || tipoAttrezzatura === 'IDRANTI')
                                    checked.attrezzature[tipoAttrezzatura]['Progressivo ' + tipoAttrezzatura.toLowerCase() + ' ' + i++] = ' ' + $(input).attr('id');
                            }
                        })
                    }
                })
            }
        });

        $.each(checked.attrezzature, function (key, value) {
            if(!$.isEmptyObject(value))
                isEmpty = false;
        });

        if(!isMotiv){
            showError($('#error-content-popup'), 'Seleziona motivo', 'Inserire il motivo della richiesta di assistenza', 'error');
        }else {
            if (!isEmpty) {
                sendEmail($('#error-content-popup'), 'start');

                assistenzaFormData.append('assistenza', JSON.stringify(checked));
                let richiediAssistenzaPromise = httpPost('php/ajax/send_email_assistenza.php', assistenzaFormData);
                richiediAssistenzaPromise.then(
                    function (data) {
                        if (data.result) {
                            sendEmail($('#error-content-popup'), 'stop');
                            showError($('#error-content-popup'), "Mail inviata", "La richiesta di assistenza è stata inoltrata con successo", "success");
                            setTimeout(function () {
                                window.location.href = 'content.php';
                            }, 1500)
                        }else
                            showError($('#error-content-popup'), "Email non spedita", "C'è stato un problema con l'invio della mail. Ripromare più tardi.", "error");
                    }
                )
                // assistenzaMessaggioErrore.append('<p class="center-text error-message text-shadow-none white-text">Selezionare tutti i valori richiesti</p>');
            } else {
                showError($('#error-content-popup'), "Selezionare attrezzatura", "Selezionare almeno una attrezzatura", "error");
            }
        }
    }
});

function getContrattiAssistenza() {
    let contrattiPromise = httpPost('php/ajax/get_contratti.php');
    contrattiPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {

                //inserisco le voci nella select del contratto
                $.each(data[0], function (key, value) {
                    $.each(value, function (innerKey, innerValue) {
                        richiestaAssistenzaContrattoSelect.append('<option>' + innerValue.nome + '</option>');
                    });
                })
            }else{
                $('#assistenzaMessaggioErrore').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
            }
        }
    );
}

function resetPageFields() {

    richiestaAssistenzaContrattoSelect.children('option:not(:first)').remove();
    $('#richiestaAssistenzaContrattoSelect option:eq(0)').prop('selected', true);

    richiestaAssistenzaContrattoSelect.addClass('ui-disabled');
    richiestaAssistenzaContrattoSelect.selectmenu('refresh');

    richiestaAssistenzaFilialeSelect.children('option:not(:first)').remove();
    $('#richiestaAssistenzaFilialeSelect option:eq(0)').prop('selected', true);

    richiestaAssistenzaFilialeSelect.addClass('ui-disabled');
    richiestaAssistenzaFilialeSelect.selectmenu('refresh');

    $('.info-tecnico').empty();
    $('#altro-selection').empty();
    noteAggiuntive.empty();
    resultForCheck.empty();
    inviaRichiestaAssistenzaDati.addClass('ui-disabled');
}

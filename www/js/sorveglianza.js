'use strict';

function resetSorveglianza() {
    let sorveglianzaContrattoPromise = httpPost('php/ajax/get_contratti.php');

    sorveglianzaContrattoPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                // $('#sorveglianzaAggiungiModifica').removeClass('ui-disabled');
                // $('#sorveglianzaInviaDati').removeClass('ui-disabled');

                $('#sorveglianzaFilialeSelect').children('option:not(:first)').remove();
                $('#sorveglianzaFilialeSelect option:eq(0)').prop('selected', true);
                $('#sorveglianzaFilialeSelect').selectmenu('refresh');

                $('#sorveglianzaContrattoSelect').children('option:not(:first)').remove();
                $('#sorveglianzaContrattoSelect option:eq(0)').prop('selected', true);
                $('#sorveglianzaContrattoSelect').selectmenu('refresh');

                $('#sorveglianzaFilialeSelect').addClass('ui-disabled');

                $('#questionarioSorveglianza').empty();
                $('#referente-name').addClass('display-none');
                $('#sorveglianza-email').addClass('display-none');

                $.each(data[0], function (key, value) {
                    $.each(value, function (innerKey, innerValue) {
                        $('#sorveglianzaContrattoSelect').append('<option>' + innerValue.nome + '</option>');
                    });
                })
            }else {
                $('#sorveglianzaMessaggioErrore').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
            }
        }
    );

    caricaModifiche();
}

function selectContract() {

    console.log('inside contratto');
    $('#sorveglianzaContrattoSelect').off('change').on('change', function (e) {
        var sorveglianzaContratto = this.value;

        $('#questionarioSorveglianza').empty();


        var sorveglianzaFilialePromise = httpPost('php/ajax/get_attrezzature.php');

        sorveglianzaFilialePromise.then(
            function (data) {
                //controllo se ci sono stati degli errori nella chiamata
                if (data.result) {
                    $('#sorveglianzaFilialeSelect').children('option:not(:first)').remove();
                    $('#sorveglianzaFilialeSelect option:eq(0)').prop('selected', true);
                    $('#sorveglianzaFilialeSelect').selectmenu('refresh');

                    $.each(data[0], function (key, value) {
                        if (value.contratto === sorveglianzaContratto) {
                            var sorveglianzaPromiseForm = new FormData();
                            sorveglianzaPromiseForm.append('contratto', value.contratto);
                            var sorveglianzaAttrezzaturePromise = httpPost("php/ajax/get_filiale_per_contratto.php", sorveglianzaPromiseForm);
                            sorveglianzaAttrezzaturePromise.then(
                                function (data) {
                                    if (data.result) {
                                        $.each(data.filiali, function (key, value) {
                                            if(key !== 'tecnico' && key !== 'telefono_tecnico' && key !== 'email_tecnico')
                                                $('#sorveglianzaFilialeSelect').append('<option>' + value + '</option>');
                                        })
                                    }
                                }
                            )
                        }
                    });
                }else {
                    $('#sorveglianzaMessaggioErrore').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
                }
            }
        );

        $('#sorveglianzaFilialeSelect').removeClass('ui-disabled');
        $('#sorveglianzaFilialeSelect').selectmenu('refresh');
    });
}

selectContract();

function selectFiliale(filiale) {

    $('#sorveglianzaFilialeSelect').off('change').on('change', function (e) {
        // e.stopImmediatePropagation();
        console.log('filiale inside: ' + filiale);
        let attrezzaturePromise = httpPost('php/ajax/get_attrezzature.php');
        let i = 0;

        let domandePromise = httpPost('php/ajax/get_domande.php');

        let content;
        attrezzaturePromise.then(
            function (data) {
                //controllo se ci sono stati degli errori nella chiamata
                if (data.result) {
                    $('#referente-name').removeClass('display-none');
                    $('#sorveglianza-email').removeClass('display-none');
                    domandePromise.then(
                        function (dom) {
                            if (dom.result) {
                                $.each(data[0], function (key, value) {
                                    if (value.contratto === $('#sorveglianzaContrattoSelect').val()) {
                                        $.each(value.lista, function (innerKey, innerValue) {
                                            let label = innerValue.replace('LISTA_', '');
                                            console.log(label);
                                            content = $("<div id='" + label + "' data-role='collapsible' data-inset='true' class='sorveglianza-collapsible'><h3>" + label + "</h3></div>");
                                            $.each(dom.domande, function (lastKey, lastValue) {
                                                if (label.toLowerCase() === lastValue['type']) {
                                                    let div = $('<div class="clear-float-left padding-top-5px border-top-2-green"></div>');
                                                    let question = $('<p class="center-text margin-top-20">' + lastValue['number'] + ') ' + lastValue['question'] + '</p>');
                                                    let answer = $('<div></div>');
                                                    let siDiv = $('<div class="si-checkbox"></div>');
                                                    let siLabel = $('<label class="font-small">SI</label>');
                                                    let si = $('<input type="radio" name="radio-' + label + '-' + lastValue['number'] + '" checked="checked">').on('click', function () {
                                                        $('#sorveglianza-note-' + label + '-' + lastValue['number']).remove();
                                                    });
                                                    siLabel.append(si);
                                                    siDiv.append(siLabel);
                                                    let noDiv = $('<div class="no-checkbox"></div>');
                                                    let noLabel = $('<label class="font-small">NO</label>');
                                                    let no = $('<input type="radio" name="radio-' + label + '-' + lastValue['number'] + '">').on('click', function () {
                                                        let note = $('<div class="clear-float-left"><textarea name="note" class="sorveglianza-note" id="sorveglianza-note-' + label + '-' + lastValue['number'] + '" rows="2" placeholder="Inserire nota"></textarea></div>');
                                                        if($('#sorveglianza-note-' + label + '-' + lastValue['number']).length === 0)
                                                            div.append(note).trigger('create');
                                                        $('.sorveglianza-note').parent().addClass('margin-auto-lr width-95 margin-bottom-none border-radius-bottom-none');
                                                    });
                                                    noLabel.append(no);
                                                    noDiv.append(noLabel);
                                                    answer.append(siDiv);
                                                    answer.append(noDiv);
                                                    div.append(question);
                                                    div.append(answer);
                                                    content.append(div);
                                                }
                                                $('#questionarioSorveglianza').append(content);
                                            });
                                            $('#questionarioSorveglianza').trigger('create');
                                        });
                                    }
                                })
                            }
                        }
                    );
                } else {
                    $('#attrezzature').append('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                }
            }
        );
        $('#sorveglianzaInviaDati').removeClass('ui-disabled');
        $('#sorveglianzaAggiungiModifica').removeClass('ui-disabled');
    });
}

selectFiliale();

// function resetSorveglianza() {
//     $('#sorveglianzaFilialeSelect').removeClass('ui-disabled');
//     $('#sorveglianzaContrattoSelect').removeClass('ui-disabled');
//     $('#questionarioSorveglianza').empty();
//
//     $('#sorveglianzaFilialeSelect').children('option:not(:first)').remove();
//     $('#sorveglianzaFilialeSelect option:eq(0)').prop('selected', true);
//     $('#sorveglianzaContrattoSelect option:eq(0)').prop('selected', true);
//     $('#sorveglianzaFilialeSelect').selectmenu('refresh');
//     $('#sorveglianzaContrattoSelect').selectmenu('refresh');
// }


$('#sorveglianzaAggiungiModifica').on('click', function () {
    $('#sorveglianzaFilialeSelect').removeClass('ui-disabled');
    $('#sorveglianzaContrattoSelect').removeClass('ui-disabled');
    $('#sorveglianzaAggiungiModifica').addClass('ui-disabled');
    $('#sorveglianzaInviaDati').addClass('ui-disabled');

    saveTemp();
    // $('#sorveglianzaFilialeSelect').children('option:not(:first)').remove();
    // $('#sorveglianzaFilialeSelect option:eq(0)').prop('selected', true);
    // $('#sorveglianzaContrattoSelect option:eq(0)').prop('selected', true);
    // $('#sorveglianzaFilialeSelect').selectmenu('refresh');
    // $('#sorveglianzaContrattoSelect').selectmenu('refresh');
    // $('#questionarioSorveglianza').empty();
});

function saveTemp(){
    if ($('#sorveglianzaContrattoSelect').val() !== "Seleziona un contratto..." && $('#sorveglianzaFilialeSelect').val() !== 'Seleziona una filiale....') {
        let snapShot = getData(true);

        let sorveglianzaTempSaveForm = new FormData();

        console.log(snapShot);
        sorveglianzaTempSaveForm.append('valori', JSON.stringify(snapShot));

        let sorveglianzaTempSavePromise = httpPost('php/ajax/temp_save_sorveglianza.php', sorveglianzaTempSaveForm);

        sorveglianzaTempSavePromise.then(
            function (data) {
                //controllo se ci sono stati degli errori nella chiamata
                if (data.result) {
                    showError($('#error-sorveglianza-popup'), 'Sorveglianza', 'I dati sono stati salvati', 'success');
                    setTimeout(function () {
                        window.location.href = 'content.php';
                    }, 1500)
                }
            }
        );
    }else {
        showError($('#error-sorveglianza-popup'), 'Sorveglianza', 'Selezionare un contratto e una filiale', 'error');
    }
}

function getData(temp) {
    let i = 1;
    let snapShot = {};
    snapShot['isComplete'] = true;
    let nowDate = new Date($.now());
    let month = nowDate.getMonth()+1;
    let day = nowDate.getDate();
    let emptyFields = false;

    snapShot['time'] = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + nowDate.getFullYear();

    let sorveglianzaInfoContratto = $('#sorveglianzaContrattoSelect').val();
    let sorveglianzaInfoFiliale = $('#sorveglianzaFilialeSelect').val();
    console.log($('#sorveglianzaRadioFieldset :radio:checked').val());
    snapShot['info'] = {'frequenza': $('#sorveglianzaRadioFieldset :radio:checked').val(), 'contratto': sorveglianzaInfoContratto, 'filiale': sorveglianzaInfoFiliale, 'incaricato': $('#referente-name').find('input').val(), 'email': $('#sorveglianza-email').find('input').val()};

    $.each($('#questionarioSorveglianza').children(), function (key, value) {

        if(value.tagName === 'DIV'){
            let tipoAttrezzatura = $(value).attr('id');
            snapShot[tipoAttrezzatura] = {};

            $.each($(value).children(), function (innerKey, innerValue) {
                if(innerValue.tagName === 'DIV') {
                    i = 1;
                    $.each($(innerValue).children(), function (lastKey, lastValue) {
                        let radio = $(lastValue).find('input[type="radio"]');
                        let question = $(lastValue).find('p').text();
                        if($(radio).is(':checked')) {
                            console.log('radio is checked');
                            if($(radio).first().is(':checked'))
                                snapShot[tipoAttrezzatura][i++] = {question: question, checked: '1'};
                            else{
                                if ($(lastValue).children().eq(2).length !== 0) {
                                    let noteValue = $(lastValue).children().eq(2).find('textarea').val();
                                    if( noteValue !== "") {
                                        snapShot[tipoAttrezzatura][i++] = {question: question, checked: noteValue};
                                    }else
                                        snapShot[tipoAttrezzatura][i++] = {question: question, checked: '0'};
                                    // snapShot[tipoAttrezzatura][i] = {};
                                    // snapShot[tipoAttrezzatura][i]['value'] = "0";
                                    // snapShot[tipoAttrezzatura][i++]['note'] = $(lastValue).children().eq(2).find('input').val();
                                }else
                                    snapShot[tipoAttrezzatura][i++] = '0'
                            }
                        }else {
                            if(temp) {
                                snapShot['isComplete'] = false;
                                snapShot[tipoAttrezzatura][i++] = {question: question, checked: '-1'}
                            }else{
                                emptyFields = true;
                            }
                        }
                    })
                }
            })
        }
    });

    if(emptyFields){
        return null;
    }else {
        return snapShot;
    }
}

function caricaModifiche() {
    let getTempSorveglianzaPromise = httpPost('php/ajax/get_temp_saved_sorveglianza.php');

    getTempSorveglianzaPromise.then(
        function (risposte) {
            //controllo se ci sono stati degli errori nella chiamata
            if (risposte.result) {
                console.log(risposte);
                if (!$.isEmptyObject(risposte[0])) {
                    console.log('risposte is empty');
                    $('#attrezzature').empty();
                    $('#questionarioSorveglianza').empty();

                    $('#sorveglianzaAggiungiModifica').removeClass('ui-disabled');
                    $('#sorveglianzaInviaDati').removeClass('ui-disabled');

                    // var checked = $("#sorveglianzaRadioFieldset input[type='radio']:checked").val();

                    $("#sorveglianzaRadioFieldset input:radio").attr('checked', false);
                    $("#sorveglianzaRadioFieldset input:radio").parent().find('label').removeClass('ui-radio-on ui-btn-active');

                    // $("#sorveglianzaRadioFieldset").trigger('create');
                    $('input:radio[name="frequenza"]').filter('[value="' + risposte[0][0].frequency + '"]').prop('checked', true);
                    $('input:radio[name="frequenza"]').filter('[value="' + risposte[0][0].frequency + '"]').parent().find('label').removeClass('ui-radio-off');
                    $('input:radio[name="frequenza"]').filter('[value="' + risposte[0][0].frequency + '"]').parent().find('label').addClass('ui-radio-on ui-btn-active');
                    $("#sorveglianzaRadioFieldset").trigger('create');

                    $('#sorveglianzaContrattoSelect').val(risposte[0][0].contratto);
                    $('#sorveglianzaContrattoSelect').selectmenu('refresh');
                    $('#sorveglianzaFilialeSelect').removeClass('ui-disabled');
                    $('#sorveglianzaFilialeSelect').append('<option>' + risposte[0][0].filiale + '</option>');
                    $('#sorveglianzaFilialeSelect').val(risposte[0][0].filiale);
                    $('#sorveglianzaFilialeSelect').selectmenu('refresh');

                    $('#referente-name').removeClass('display-none');
                    $('#referente-name').find('input').val(risposte[0][0].name);

                    $('#sorveglianza-email').removeClass('display-none');
                    $('#sorveglianza-email').find('input').val(risposte[0][0].email);


                    let lastValue;
                    let content;

                    $.each(risposte[0], function (key, value) {
                        console.log(value.question);

                        if (value.type !== lastValue)
                            content = $("<div id='" + value.type + "' data-role='collapsible' data-inset='true' class='sorveglianza-collapsible'><h3>" + value.type + "</h3></div>");

                        let div = $('<div class="clear-float-left padding-top-5px border-top-2-green"></div>');
                        let question = $('<p class="center-text margin-top-20">' + value.number + ') ' + value.question + '</p>');
                        let gotAnswer = $('<div></div>');

                        if (value.answer === '-1'){
                            let siDiv = $('<div class="si-checkbox"></div>');
                            let siLabel = $('<label class="font-small">SI</label>');
                            let si = $('<input type="radio" name="radio-' + value.type + '-' + value.number + '">').on('click', function () {
                                $('#sorveglianza-note-' + value.type + '-' + value.number).remove();
                            });
                            siLabel.append(si);
                            siDiv.append(siLabel);
                            gotAnswer.append(siDiv);

                            let noDiv = $('<div class="no-checkbox"></div>');
                            let noLabel = $('<label class="font-small">NO</label>');
                            let no = $('<input type="radio" name="radio-' + value.type + '-' + value.number + '">').on('click', function () {
                                let note = $('<div class="clear-float-left"><textarea name="note" class="sorveglianza-note" id="sorveglianza-note-' + value.type + '-' + value.number + '" rows="2" placeholder="Inserire nota"></textarea></div>');
                                    div.ar('create');
                            });

                            noLabel.append(no);
                            noDiv.append(noLabel);
                            gotAnswer.append(noDiv);
                            div.append(question);
                            div.append(gotAnswer);
                        }else if (value.answer !== "0" && value.answer !== "1") {
                            let siDiv = $('<div class="si-checkbox"></div>');
                            let siLabel = $('<label class="font-small">SI</label>');
                            let si = $('<input type="radio" name="radio-' + value.type + '-' + value.number + '">').on('click', function () {
                                $('#sorveglianza-note-' + value.type + '-' + value.number).remove();
                            });
                            siLabel.append(si);
                            siDiv.append(siLabel);
                            gotAnswer.append(siDiv);

                            let noDiv = $('<div class="no-checkbox"></div>');
                            let noLabel = $('<label class="font-small">NO</label>');
                            let no = $('<input type="radio" name="radio-' + value.type + '-' + value.number + '" checked="checked">').on('click', function () {
                                let note = $('<div class="clear-float-left"><textarea name="note" class="sorveglianza-note" id="sorveglianza-note-' + value.type + '-' + value.number + '" rows="2" placeholder="Inserire nota"></textarea></div>');
                                if ($('#sorveglianza-note-' + value.type + '-' + value.number).length === 0)
                                    div.append(note).trigger('create');
                            });

                            let recoveredNote = $('<div class="clear-float-left"><textarea name="note" class="sorveglianza-note" id="sorveglianza-note-' + value.type + '-' + value.number + '">' + value.answer + '</textarea></div>');
                            noLabel.append(no);
                            noDiv.append(noLabel);
                            gotAnswer.append(noDiv);
                            div.append(question);
                            div.append(gotAnswer);
                            div.append(recoveredNote);
                        } else if (value.answer === "0"){
                            let siDiv = $('<div class="si-checkbox"></div>');
                            let siLabel = $('<label class="font-small">SI</label>');
                            let si = $('<input type="radio" name="radio-' + value.type + '-' + value.number + '">').on('click', function () {
                                $('#sorveglianza-note-' + value.type + '-' + value.number).remove();
                            });
                            siLabel.append(si);
                            siDiv.append(siLabel);
                            gotAnswer.append(siDiv);

                            let noDiv = $('<div class="no-checkbox"></div>');
                            let noLabel = $('<label class="font-small">NO</label>');
                            let no = $('<input type="radio" name="radio-' + value.type + '-' + value.number + '" checked="checked">').on('click', function () {
                                let note = $('<div class="clear-float-left"><textarea name="note" class="sorveglianza-note" id="sorveglianza-note-' + value.type + '-' + value.number + '" maxlength="10" placeholder="Inserire nota"></textarea></div>');
                                if ($('#sorveglianza-note-' + value.type + '-' + value.number).length === 0)
                                    div.append(note).trigger('create');
                            });
                            noLabel.append(no);
                            noDiv.append(noLabel);
                            gotAnswer.append(noDiv);
                            div.append(question);
                            div.append(gotAnswer);
                        }else {
                            let siDiv = $('<div class="si-checkbox"></div>');
                            let siLabel = $('<label class="font-small">SI</label>');
                            let si = $('<input type="radio" name="radio-' + value.type + '-' + value.number + '" checked="checked">').on('click', function () {
                                $('#sorveglianza-note-' + value.type + '-' + value.number).remove();
                            });
                            siLabel.append(si);
                            siDiv.append(siLabel);
                            gotAnswer.append(siDiv);

                            let noDiv = $('<div class="no-checkbox"></div>');
                            let noLabel = $('<label class="font-small">NO</label>');
                            let no = $('<input type="radio" name="radio-' + value.type + '-' + value.number + '">').on('click', function () {
                                let note = $('<div class="clear-float-left"><textarea name="note" class="sorveglianza-note" id="sorveglianza-note-' + value.type + '-' + value.number + '" maxlength="10" placeholder="Inserire nota"></textarea></div>');
                                if ($('#sorveglianza-note-' + value.type + '-' + value.number).length === 0)
                                        div.append(note).trigger('create');
                            });

                            noLabel.append(no);
                            noDiv.append(noLabel);
                            gotAnswer.append(noDiv);
                            div.append(question);
                            div.append(gotAnswer);
                        }

                        content.append(div);

                        $('#questionarioSorveglianza').append(content);

                        lastValue = value.type;


                    });
                    $('#questionarioSorveglianza').trigger('create')
                }else {
                    // resetSorveglianza();
                }
                console.log('radio value');
                console.log($('#sorveglianzaRadioFieldset').val());
            }
        }
    );
}

$('#sorveglianzaInviaDati').on('click', function () {
    if($('#referente-name').find('input').val() === ""){
        showError($('#error-sorveglianza-popup'), 'Sorveglianza', 'Inserire il nome del referente', 'error');
    }else if($('#sorveglianza-email').find('input').val() === ""){
        showError($('#error-sorveglianza-popup'), 'Sorveglianza', 'Inserire l\'email alla quale inviare la sorveglianza', 'error');
    }else {
        console.log('inside else');
        let data = getData(false);
        console.log('data: ' + data);
        if(data === null){
            console.log('data is undefined');
            showError($('#error-sorveglianza-popup'), 'Sorveglianza', 'Selezionare almeno una risposta per tutte le domande', 'error');
        }else{
            console.log(data);
            createPdf(data);
        }
    }
});


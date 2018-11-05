'use strict';

function resetSorveglianza() {
    let sorveglianzaContrattoPromise = httpPost('php/ajax/get_contratti.php');

    sorveglianzaContrattoPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                $('#sorveglianzaAggiungiModifica').removeClass('ui-disabled');
                $('#sorveglianzaInviaDati').removeClass('ui-disabled');

                $('#sorveglianzaFilialeSelect').children('option:not(:first)').remove();
                $('#sorveglianzaFilialeSelect option:eq(0)').prop('selected', true);
                $('#sorveglianzaFilialeSelect').selectmenu('refresh');

                $('#sorveglianzaContrattoSelect').children('option:not(:first)').remove();
                $('#sorveglianzaContrattoSelect option:eq(0)').prop('selected', true);
                $('#sorveglianzaContrattoSelect').selectmenu('refresh');

                $('#sorveglianzaFilialeSelect').addClass('ui-disabled');

                $('#questionarioSorveglianza').empty();

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
                                            if(key === 'filiale')
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
                                                console.log(lastValue['type']);
                                                if (label.toLowerCase() === lastValue['type']) {
                                                    let div = $('<div class="clear-float-left padding-top-5px border-top-2-blue"></div>');
                                                    let question = $('<p class="center-text margin-top-20">' + lastValue['number'] + ') ' + lastValue['question'] + '</p>');
                                                    let answer = $('<div></div>');
                                                    let siDiv = $('<div class="si-checkbox"></div>');
                                                    let siLabel = $('<label class="font-small">SI</label>');
                                                    let si = $('<input type="radio" name="radio-' + label + '-' + lastValue['number'] + '">').on('click', function () {
                                                        $('#sorveglianza-note-' + label + '-' + lastValue['number']).remove();
                                                    });
                                                    siLabel.append(si);
                                                    siDiv.append(siLabel);
                                                    let noDiv = $('<div class="no-checkbox"></div>');
                                                    let noLabel = $('<label class="font-small">NO</label>');
                                                    let no = $('<input type="radio" name="radio-' + label + '-' + lastValue['number'] + '">').on('click', function () {
                                                        let note = $('<div class="clear-float-left"><input type="text" name="note" class="sorveglianza-note" id="sorveglianza-note-' + label + '-' + lastValue['number'] + '" maxlength="10" placeholder="Inserire nota(max 50 caratteri)"></div>');
                                                        console.log($('#sorveglianza-note-' + label + '-' + lastValue['number']).length == 0);
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

    let snapShot = getData();
    let sorveglianzaTempSaveForm = new FormData();

    console.log(snapShot);
    if(snapShot.isComplete) {
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
    }

    // $('#sorveglianzaFilialeSelect').children('option:not(:first)').remove();
    // $('#sorveglianzaFilialeSelect option:eq(0)').prop('selected', true);
    // $('#sorveglianzaContrattoSelect option:eq(0)').prop('selected', true);
    // $('#sorveglianzaFilialeSelect').selectmenu('refresh');
    // $('#sorveglianzaContrattoSelect').selectmenu('refresh');
    // $('#questionarioSorveglianza').empty();
});

function getData() {
    let i = 1;
    let snapShot = {};
    snapShot['isComplete'] = true;

    let sorveglianzaInfoContratto = $('#sorveglianzaContrattoSelect').val();
    let sorveglianzaInfoFiliale = $('#sorveglianzaFilialeSelect').val();
    console.log($('#sorveglianzaRadioFieldset :radio:checked').val());
    snapShot['info'] = {'frequenza': $('#sorveglianzaRadioFieldset :radio:checked').val(), 'contratto': sorveglianzaInfoContratto, 'filiale': sorveglianzaInfoFiliale};

    $.each($('#questionarioSorveglianza').children(), function (key, value) {

        if(value.tagName === 'DIV'){
            let tipoAttrezzatura = $(value).attr('id');
            snapShot[tipoAttrezzatura] = {};

            $.each($(value).children(), function (innerKey, innerValue) {
                if(innerValue.tagName === 'DIV') {
                    i = 1;
                    $.each($(innerValue).children(), function (lastKey, lastValue) {
                        let input = $(lastValue).find('input[type="radio"]');
                        if($(input).is(':checked')) {
                            if($(input).first().is(':checked'))
                                snapShot[tipoAttrezzatura][i++] = "1";
                            else{
                                if ($(lastValue).children().eq(2).length !== 0) {
                                    let noteValue = $(lastValue).children().eq(2).find('input').val();
                                    if( noteValue !== "") {
                                        snapShot[tipoAttrezzatura][i++] = noteValue;
                                    }else
                                        snapShot[tipoAttrezzatura][i++] = '0';
                                    // snapShot[tipoAttrezzatura][i] = {};
                                    // snapShot[tipoAttrezzatura][i]['value'] = "0";
                                    // snapShot[tipoAttrezzatura][i++]['note'] = $(lastValue).children().eq(2).find('input').val();
                                }else
                                    snapShot[tipoAttrezzatura][i++] = '0'
                            }
                        }else {
                            snapShot['isComplete'] = false;
                            showError($('#error-sorveglianza-popup'), 'Sorveglianza', 'Mettere il ckeck su tutti i campi', 'error');
                        }
                    })
                }
            })
        }
    });

    return snapShot;
}

function caricaModifiche() {
    let getTempSorveglianzaPromise = httpPost('php/ajax/get_temp_saved_sorveglianza.php');

    getTempSorveglianzaPromise.then(
        function (risposte) {
            //controllo se ci sono stati degli errori nella chiamata
            if (risposte.result) {
                console.log('result ok');
                console.log(risposte);
                if (!$.isEmptyObject(risposte[0])) {
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

                    let lastValue;
                    let content;

                    $.each(risposte[0], function (key, value) {
                        console.log(value.question);

                        if (value.type !== lastValue)
                            content = $("<div id='" + value.type + "' data-role='collapsible' data-inset='true' class='sorveglianza-collapsible'><h3>" + value.type + "</h3></div>");

                        let div = $('<div class="clear-float-left padding-top-5px border-top-2-blue"></div>');
                        let question = $('<p class="center-text margin-top-20">' + value.number + ') ' + value.question + '</p>');
                        let gotAnswer = $('<div></div>');

                        if (value.answer !== "0" && value.answer !== "1") {
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
                                let note = $('<div class="clear-float-left"><input type="text" name="note" class="sorveglianza-note" id="sorveglianza-note-' + value.type + '-' + value.number + '" maxlength="10" placeholder="Inserire nota(max 50 caratteri)"></div>');
                                if ($('#sorveglianza-note-' + value.type + '-' + value.number).length === 0)
                                    div.append(note).trigger('create');
                            });

                            let recoveredNote = $('<div class="clear-float-left"><input type="text" name="note" class="sorveglianza-note" id="sorveglianza-note-' + value.type + '-' + value.number + '" maxlength="10" value="' + value.answer + '"></div>');
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
                                let note = $('<div class="clear-float-left"><input type="text" name="note" class="sorveglianza-note" id="sorveglianza-note-' + value.type + '-' + value.number + '" maxlength="10" placeholder="Inserire nota(max 50 caratteri)"></div>');
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
                                let note = $('<div class="clear-float-left"><input type="text" name="note" class="sorveglianza-note" id="sorveglianza-note-' + value.type + '-' + value.number + '" maxlength="10" placeholder="Inserire nota(max 50 caratteri)"></div>');
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
                    // let caricaattrezzaturePromise = httpPost('php/ajax/get_attrezzature.php');
                    // let caricaDomandePromise = httpPost('php/ajax/get_domande.php');
                    // let i = 0;
                    // let j = 0;
                    //
                    // let content = '';
                    // caricaattrezzaturePromise.then(
                    //     function (data) {
                    //         //controllo se ci sono stati degli errori nella chiamata
                    //         if (data.result) {
                    //             caricaDomandePromise.then(
                    //                 function (dom) {
                    //                     if (dom.result) {
                    //                         $.each(data[0], function (key, value) {
                    //                             if (value.contratto === $('#sorveglianzaContrattoSelect').val()) {
                    //                                 $.each(value.lista, function (innerKey, innerValue) {
                    //                                     var label = innerValue.replace('LISTA_', '');
                    //                                     content += "<div id='" + label + "' data-role='collapsible' data-inset='true'><h3>" + label + "</h3>";
                    //                                     $.each(dom.domande, function (lastKey, lastValue) {
                    //                                         if (label === lastKey) {
                    //                                             j = 0;
                    //                                             $.each(lastValue, function (k, v) {
                    //                                                 if (label === 'ESTINTORI') {
                    //                                                     console.log('ESTINTORI: ' + risposte.domande.ESTINTORI[0]);
                    //                                                     if (risposte.domande.ESTINTORI[j++] === 'ok') {
                    //                                                         console.log('ESTINTORI SI');
                    //                                                         content += '<input type="checkbox" id="' + i + '" checked="checked"><label for="' + i++ + '">' + v + '</label>';
                    //                                                     } else {
                    //                                                         content += '<input type="checkbox" id="' + i + '"><label for="' + i++ + '">' + v + '</label>';
                    //                                                     }
                    //                                                 } else if (label === 'PORTE') {
                    //                                                     console.log('ESTINTORI: ' + risposte.domande.ESTINTORI[0]);
                    //                                                     if (risposte.domande.PORTE[j++] === 'ok') {
                    //                                                         console.log('ESTINTORI SI');
                    //                                                         content += '<input type="checkbox" id="' + i + '" checked="checked"><label for="' + i++ + '">' + v + '</label>';
                    //                                                     } else {
                    //                                                         content += '<input type="checkbox" id="' + i + '"><label for="' + i++ + '">' + v + '</label>';
                    //                                                     }
                    //                                                 } else if (label === 'LUCI') {
                    //                                                     console.log('ESTINTORI: ' + risposte.domande.ESTINTORI[0]);
                    //                                                     if (risposte.domande.LUCI[j++] === 'ok') {
                    //                                                         console.log('ESTINTORI SI');
                    //                                                         content += '<input type="checkbox" id="' + i + '" checked="checked"><label for="' + i++ + '">' + v + '</label>';
                    //                                                     } else {
                    //                                                         content += '<input type="checkbox" id="' + i + '"><label for="' + i++ + '">' + v + '</label>';
                    //                                                     }
                    //                                                 }
                    //                                             })
                    //                                         }
                    //                                     });
                    //                                     content += '</div>';
                    //                                 });
                    //                                 $('#questionarioSorveglianza').append(content).trigger('create');
                    //                             }
                    //                         })
                    //                     }
                    //                 }
                    //             );
                    //             $('#sorveglianzaAggiungiModifica').removeClass('ui-disabled');
                    //             $('#sorveglianzaInviaDati').removeClass('ui-disabled');
                    //         } else {
                    //             $('#attrezzature').append('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                    //         }
                    //     }
                    // );
                    // }
                }else {
                    resetSorveglianza();
                }
                console.log('radio value');
                console.log($('#sorveglianzaRadioFieldset').val());
            }
        }
    );
}
'use strict';

/**
 * Funzione che resetta e inserisce i campi della sorveglianza
 */
function resetSorveglianza() {
    //invio richiesta httpxml
    let sorveglianzaContrattoPromise = httpPost('php/ajax/get_contratti.php');

    //interpreto risposta
    sorveglianzaContrattoPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {

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

    //carico i dati salvati sul server se ci sono
    caricaModifiche();
}

/**
 * Funzione che gestisce la selezione di un contratto
 */
function selectContract() {

    $('#sorveglianzaContrattoSelect').off('change').on('change', function (e) {
        let sorveglianzaContratto = this.value;

        $('#questionarioSorveglianza').empty();

        //invio richiesta httpxml
        let sorveglianzaFilialePromise = httpPost('php/ajax/get_attrezzature.php');

        //interpreto risposta
        sorveglianzaFilialePromise.then(
            function (data) {
                //controllo se ci sono stati degli errori nella chiamata
                if (data.result) {
                    $('#sorveglianzaFilialeSelect').children('option:not(:first)').remove();
                    $('#sorveglianzaFilialeSelect option:eq(0)').prop('selected', true);
                    $('#sorveglianzaFilialeSelect').selectmenu('refresh');

                    $.each(data[0], function (key, value) {
                        if (value.contratto === sorveglianzaContratto) {
                            let sorveglianzaPromiseForm = new FormData();
                            sorveglianzaPromiseForm.append('contratto', value.contratto);

                            //invio richiesta httpxml
                            let sorveglianzaAttrezzaturePromise = httpPost("php/ajax/get_filiale_per_contratto.php", sorveglianzaPromiseForm);

                            //interpreto risposta
                            sorveglianzaAttrezzaturePromise.then(
                                function (data) {
                                    //controllo se ci sono stati degli errori nella chiamata
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

/**
 * Funzione che gestisce la selezione di una filiale
 * @param filiale
 */
function selectFiliale(filiale) {

    $('#sorveglianzaFilialeSelect').off('change').on('change', function (e) {
        //invio richiesta httpxml
        let attrezzaturePromise = httpPost('php/ajax/get_attrezzature.php');
        let i = 0;
        let content;

        //invio richiesta httpxml
        let domandePromise = httpPost('php/ajax/get_domande.php');

        //interpreto la risposta
        attrezzaturePromise.then(
            function (data) {
                //controllo se ci sono stati degli errori nella chiamata
                if (data.result) {
                    $('#referente-name').removeClass('display-none');
                    $('#sorveglianza-email').removeClass('display-none');

                    //interpreto la risposta
                    domandePromise.then(
                        function (dom) {
                            //controllo se ci sono stati degli errori nella chiamata
                            if (dom.result) {
                                $.each(data[0], function (key, value) {
                                    if (value.contratto === $('#sorveglianzaContrattoSelect').val()) {
                                        $.each(value.lista, function (innerKey, innerValue) {
                                            let label = innerValue.replace('LISTA_', '');
                                            content = $("<div id='" + label + "' data-role='collapsible' data-inset='true' class='sorveglianza-collapsible'><h3>" + label.replace('_', ' ') + "</h3></div>");
                                            $.each(dom.domande, function (lastKey, lastValue) {
                                                if (label.toLowerCase() === lastValue['type']) {
                                                    let div = $('<div class="clear-float-left padding-top-5px border-top-2-green"></div>');
                                                    let question = $('<p class="margin-top-20">' + lastValue['number'] + ') ' + lastValue['question'] + '</p>');
                                                    let answer = $('<div class="flex-display"></div>');
                                                    let siDiv = $('<div class="si-checkbox"></div>');
                                                    let siLabel = $('<label class="font-small">SI</label>');
                                                    let si = $('<input type="radio" name="radio-' + label + '-' + lastValue['number'] + '">').on('click', function () {
                                                        $(this).parent().parent().next().find('input[name="radio-' + label + '-' + lastValue['number'] + '"]').prev().removeClass('red-background');
                                                        $('#sorveglianza-note-' + label + '-' + lastValue['number']).parent().remove();
                                                    });
                                                    siLabel.append(si);
                                                    siDiv.append(siLabel);
                                                    let noDiv = $('<div class="no-checkbox"></div>');
                                                    let noLabel = $('<label class="font-small">NO</label>');
                                                    let no = $('<input type="radio" name="radio-' + label + '-' + lastValue['number'] + '">').on('click', function () {
                                                        $(this).prev().addClass('red-background');
                                                        let note = $('<div class="clear-float-left"><textarea name="note" class="sorveglianza-note" id="sorveglianza-note-' + label + '-' + lastValue['number'] + '" rows="2" placeholder="Inserire nota anomalia"></textarea></div>');
                                                        if($('#sorveglianza-note-' + label + '-' + lastValue['number']).length === 0)
                                                            div.append(note).trigger('create');
                                                        $('.sorveglianza-note').parent().addClass('width-95 margin-bottom-none border-radius-bottom-none');
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

//gestisco il click sul tasto
$('#sorveglianzaAggiungiModifica').on('click', function () {
    $('#sorveglianzaFilialeSelect').removeClass('ui-disabled');
    $('#sorveglianzaContrattoSelect').removeClass('ui-disabled');
    $('#sorveglianzaAggiungiModifica').addClass('ui-disabled');
    $('#sorveglianzaInviaDati').addClass('ui-disabled');

    //salvo i dati temporaneamente
    saveTemp();
});

/**
 * Funzione che salva i dati della sorveglianza in maniera temporanea sul server
 */
function saveTemp(){
    if ($('#sorveglianzaContrattoSelect').val() !== "Seleziona un contratto..." && $('#sorveglianzaFilialeSelect').val() !== 'Seleziona una filiale....') {
        let snapShot = getData(true);

        console.log(snapShot);
        let sorveglianzaTempSaveForm = new FormData();

        //recupero i dati da salvare
        sorveglianzaTempSaveForm.append('valori', JSON.stringify(snapShot));

        //invio richiesta httpxml
        let sorveglianzaTempSavePromise = httpPost('php/ajax/temp_save_sorveglianza.php', sorveglianzaTempSaveForm);

        //interpreto risposta
        sorveglianzaTempSavePromise.then(
            function (data) {
                //controllo se ci sono stati degli errori nella chiamata
                if (data.result) {
                    //notifico l'avvenuto salvatagio dei dati
                    showError($('#error-sorveglianza-popup'), 'Sorveglianza', 'I dati sono stati salvati', 'success');
                    setTimeout(function () {
                        // window.location.href = 'content.php';
                    }, 1500)
                }
            }
        );
    }else {
        showError($('#error-sorveglianza-popup'), 'Sorveglianza', 'Selezionare un contratto e una filiale', 'error');
    }
}

/**
 * Funzione che recupera che servono nella pagina sorveglianza
 * @param temp -
 * @returns {null}
 */
function getData(temp) {
    let i = 1;
    let snapShot = {};
    let nowDate = new Date($.now());
    let month = nowDate.getMonth()+1;
    let day = nowDate.getDate();
    let emptyFields = false;
    let sorveglianzaInfoContratto = $('#sorveglianzaContrattoSelect').val();
    let sorveglianzaInfoFiliale = $('#sorveglianzaFilialeSelect').val();

    snapShot['isComplete'] = true;
    snapShot['time'] = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + nowDate.getFullYear();
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

                        //controllo se ci sono delle caselle chekcbox attive
                        if($(radio).is(':checked')) {
                            //controllo se la casella attiva e' SI
                            if($(radio).first().is(':checked'))
                                snapShot[tipoAttrezzatura][i++] = {question: question, checked: '1'};
                            else{
                                console.log($(lastValue).children().eq(2).find('textarea'));
                                if ($(lastValue).children().eq(2).length !== 0) {
                                    let noteValue = $(lastValue).children().eq(2).find('textarea').val();
                                    if( noteValue !== "") {
                                        snapShot[tipoAttrezzatura][i++] = {question: question, checked: noteValue};
                                    }else
                                        snapShot[tipoAttrezzatura][i++] = {question: question, checked: '0'};
                                }else
                                    snapShot[tipoAttrezzatura][i++] = {question: question, checked: '0'}
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

    //controllo se ci sono dei camti vuoti
    if(emptyFields){
        return null;
    }else {
        return snapShot;
    }
}

/**
 * Funzine che recupera se ci sono i dati da inserire nella pagina sorveglianza
 */
function caricaModifiche() {
    //invio richiesta httpxml
    let getTempSorveglianzaPromise = httpPost('php/ajax/get_temp_saved_sorveglianza.php');

    //interpreto la risposta
    getTempSorveglianzaPromise.then(
        function (risposte) {
            //controllo se ci sono stati degli errori nella chiamata
            if (risposte.result) {
                if (!$.isEmptyObject(risposte[0])) {
                    $('#attrezzature').empty();
                    $('#questionarioSorveglianza').empty();

                    $('#sorveglianzaAggiungiModifica').removeClass('ui-disabled');
                    $('#sorveglianzaInviaDati').removeClass('ui-disabled');

                    $("#sorveglianzaRadioFieldset input:radio").attr('checked', false);
                    $("#sorveglianzaRadioFieldset input:radio").parent().find('label').removeClass('ui-radio-on ui-btn-active');

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

                    //inserisco i dati nella pagina
                    $.each(risposte[0], function (key, value) {

                        if (value.type !== lastValue)
                            content = $("<div id='" + value.type + "' data-role='collapsible' data-inset='true' class='sorveglianza-collapsible'><h3>" + value.type + "</h3></div>");

                        let div = $('<div class="clear-float-left padding-top-5px border-top-2-green"></div>');
                        let question = $('<p class="margin-top-20">' + value.number + ') ' + value.question + '</p>');
                        let gotAnswer = $('<div class="flex-display"></div>');

                        if (value.answer === '-1'){
                            let siDiv = $('<div class="si-checkbox"></div>');
                            let siLabel = $('<label class="font-small">SI</label>');
                            let si = $('<input type="radio" name="radio-' + value.type + '-' + value.number + '">').on('click', function () {
                                $(this).parent().parent().next().find('input[name="radio-' + value.type + '-' + value.number + '"]').prev().removeClass('red-background');
                                $('#sorveglianza-note-' + value.type + '-' + value.number).parent().remove();
                            });
                            siLabel.append(si);
                            siDiv.append(siLabel);
                            gotAnswer.append(siDiv);

                            let noDiv = $('<div class="no-checkbox"></div>');
                            let noLabel = $('<label class="font-small">NO</label>');
                            let no = $('<input type="radio" name="radio-' + value.type + '-' + value.number + '">').on('click', function () {
                                $(this).prev().addClass('red-background');
                                let note = $('<div class="clear-float-left"><textarea name="note" class="sorveglianza-note" id="sorveglianza-note-' + value.type + '-' + value.number + '" rows="2" placeholder="Inserire nota anomalia"></textarea></div>');
                                if ($('#sorveglianza-note-' + value.type + '-' + value.number).length === 0)
                                    div.append(note).trigger('create');
                            });
                            $(no).prev().addClass('red-background');
                            noLabel.append(no);
                            noDiv.append(noLabel);
                            gotAnswer.append(noDiv);
                            div.append(question);
                            div.append(gotAnswer);
                        }else if (value.answer !== "0" && value.answer !== "1") {
                            let siDiv = $('<div class="si-checkbox"></div>');
                            let siLabel = $('<label class="font-small">SI</label>');
                            let si = $('<input type="radio" name="radio-' + value.type + '-' + value.number + '">').on('click', function () {
                                $(this).parent().parent().next().find('input[name="radio-' + value.type + '-' + value.number + '"]').prev().removeClass('red-background');
                                $('#sorveglianza-note-' + value.type + '-' + value.number).parent().remove();
                            });
                            siLabel.append(si);
                            siDiv.append(siLabel);
                            gotAnswer.append(siDiv);

                            let noDiv = $('<div class="no-checkbox"></div>');
                            let noLabel = $('<label class="font-small red-background">NO</label>');
                            let no = $('<input type="radio" name="radio-' + value.type + '-' + value.number + '" checked="checked">').on('click', function () {
                                $(this).prev().addClass('red-background');
                                let note = $('<div class="clear-float-left"><textarea name="note" class="sorveglianza-note" id="sorveglianza-note-' + value.type + '-' + value.number + '" rows="2" placeholder="Inserire nota anomalia"></textarea></div>');
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
                            console.log('one answer is no')
                            let siDiv = $('<div class="si-checkbox"></div>');
                            let siLabel = $('<label class="font-small">SI</label>');
                            let si = $('<input type="radio" name="radio-' + value.type + '-' + value.number + '">').on('click', function () {
                                $(this).parent().parent().next().find('input[name="radio-' + value.type + '-' + value.number + '"]').prev().removeClass('red-background');
                                $('#sorveglianza-note-' + value.type + '-' + value.number).parent().remove();
                            });
                            siLabel.append(si);
                            siDiv.append(siLabel);
                            gotAnswer.append(siDiv);

                            let noDiv = $('<div class="no-checkbox"></div>');
                            let noLabel = $('<label class="font-small red-background">NO</label>');
                            let no = $('<input type="radio" name="radio-' + value.type + '-' + value.number + '" checked="checked">').on('click', function () {
                                $(this).prev().addClass('red-background');
                                let note = $('<div class="clear-float-left"><textarea name="note" class="sorveglianza-note" id="sorveglianza-note-' + value.type + '-' + value.number + '" maxlength="10" placeholder="Inserire nota anomalia"></textarea></div>');
                                if ($('#sorveglianza-note-' + value.type + '-' + value.number).length === 0)
                                    div.append(note).trigger('create');
                            });
                            $(no).prev().addClass('red-background');
                            noLabel.append(no);
                            noDiv.append(noLabel);
                            gotAnswer.append(noDiv);
                            div.append(question);
                            div.append(gotAnswer);
                        }else {
                            let siDiv = $('<div class="si-checkbox"></div>');
                            let siLabel = $('<label class="font-small">SI</label>');
                            let si = $('<input type="radio" name="radio-' + value.type + '-' + value.number + '" checked="checked">').on('click', function () {
                                $(this).parent().parent().next().find('input[name="radio-' + value.type + '-' + value.number + '"]').prev().removeClass('red-background');
                                $('#sorveglianza-note-' + value.type + '-' + value.number).parent().remove();
                            });
                            siLabel.append(si);
                            siDiv.append(siLabel);
                            gotAnswer.append(siDiv);

                            let noDiv = $('<div class="no-checkbox"></div>');
                            let noLabel = $('<label class="font-small">NO</label>');
                            let no = $('<input type="radio" name="radio-' + value.type + '-' + value.number + '">').on('click', function () {
                                $(this).prev().addClass('red-background');
                                let note = $('<div class="clear-float-left"><textarea name="note" class="sorveglianza-note" id="sorveglianza-note-' + value.type + '-' + value.number + '" maxlength="10" placeholder="Inserire nota anomalia"></textarea></div>');
                                if ($('#sorveglianza-note-' + value.type + '-' + value.number).length === 0)
                                        div.append(note).trigger('create');
                            });
                            $(no).prev().addClass('red-background');
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
                }
            }
        }
    );
}

//gestisco il click sul pulsante di invio sorveglianza
$('#sorveglianzaInviaDati').on('click', function () {

    if($('#referente-name').find('input').val() === ""){
        showError($('#error-sorveglianza-popup'), 'Sorveglianza', 'Inserire il nome del referente', 'error');
    }else if($('#sorveglianza-email').find('input').val() === ""){
        showError($('#error-sorveglianza-popup'), 'Sorveglianza', 'Inserire l\'email alla quale inviare la sorveglianza', 'error');
    }else {
        let data = getData(false);
        if(data === null){
            showError($('#error-sorveglianza-popup'), 'Sorveglianza', 'Selezionare almeno una risposta per tutte le domande', 'error');
        }else{
            //creo pdf con i dati della sorveglianza
            createPdf(data);
        }
    }
});


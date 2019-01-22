'use strict';


let richiestaAssistenzaContrattoSelect = $('#richiestaAssistenzaContrattoSelect');
let richiestaAssistenzaFilialeSelect   = $('#richiestaAssistenzaFilialeSelect');
let noteAggiuntive                     = $('#noteAggiuntive');
let resultForCheck                     = $('#resultForCheck');
let inviaRichiestaAssistenzaDati       = $('#inviaRichiestaAssistenzaDati');

/**
 * Funzione che gestisce la richiesta di assistenza
 */
function richiestaAssistenza() {
    //risetto i campi della pagina
    resetPageFields();

    $('#richiestaAssistenzaMotivoSelect').children().slice(2).remove();
    $('#richiestaAssistenzaMotivoSelect option:eq(0)').prop('selected', true);
    $('#richiestaAssistenzaMotivoSelect').selectmenu('refresh');

    //invio richiesta httpxml
    let motivoPromise = httpPost('php/ajax/get_motiv.php');

    //interpreto risposta
    motivoPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                $.each(data.motivs, function (key, value) {
                    $('#richiestaAssistenzaMotivoSelect').append('<option>' + value.descrizione + '</option>');
                })
            }
        }
    )
}

//gestisco il cambio del motivo
$('#richiestaAssistenzaMotivoSelect').on('change', function () {
    let selectedMotivo = this.value;

    // recupero i contratti
    getContrattiAssistenza();

    if (selectedMotivo === "Altro...") {
        let altroForm = '<form id="valoreAltroForm"><input type="text" name="motivoAltroValue" id="motivoAltroValue" placeholder="Inserire il motivo della richiesta di assistenza">';
        $('#altro-selection').append(altroForm).trigger('create');
    } else {
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

    //resetto  il campo di selezione della filiale
    resetSelection('richiestaAssistenzaFilialeSelect');

    //recupero le filiale del contratto
    getFilialePerContratto(selectedContratto);

    richiestaAssistenzaFilialeSelect.removeClass('ui-disabled');
    richiestaAssistenzaFilialeSelect.selectmenu('refresh');
});

/**
 * Funzione che recupera le filiale del contratto passato come parametro
 * @param selectedContratto - il contratto per il quale bisogna recuperare le filiali
 */
function getFilialePerContratto(selectedContratto) {
    let richiestaAssistenzaPromiseForm = new FormData();
    //recupero i dati da inviare
    richiestaAssistenzaPromiseForm.append('contratto', selectedContratto);

    //invio richiesta httpxml
    let richiestaAssistenzaAttrezzaturePromise = httpPost("php/ajax/get_filiale_per_contratto.php", richiestaAssistenzaPromiseForm);

    //interpreto risposta
    richiestaAssistenzaAttrezzaturePromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                $.each(data.filiali, function (key, value) {
                    if (key === 'tecnico') {
                        $('.info-tecnico').append('<p class="center-text"><span class="float-left margin-left-20px"><b class="red-text font-large">Tecnico:</b></span><span class="float-right margin-right-10px"> ' + value + '</span></p>');
                    } else if (key === 'telefono_tecnico') {
                        $('.info-tecnico').append('<br> <p><span class="float-left margin-left-20px"><b class="red-text font-large">Cellulare:</b></span><span class="float-right margin-right-10px"><a class="" href="tel://' + value + '">' + value + '</a></span></p>')
                    } else if (key === 'email_tecnico') {
                        $('.info-tecnico').append('<br> <p><span class="float-left margin-left-20px"><b class="red-text font-large">Email:</b></span><span class="float-right margin-right-10px email"> ' + value + '</span></p>')
                    } else {
                        $('#richiestaAssistenzaFilialeSelect').append('<option>' + value + '</option>');
                    }
                })
            } else {
                $('#assistenzaMessaggioErrore').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
            }
        }
    );
}

//gestisco il cambio della filiale
$('#richiestaAssistenzaFilialeSelect').on('change', function (e) {
    let selectedFiliale = this.value;
    let contratto       = $('#richiestaAssistenzaContrattoSelect').val();
    let content         = '';
    let filialeForm     = new FormData();

    $('#noteAggiuntive').empty();
    $('#resultForCheck').empty();

    //recupero i dati da inviare al server
    filialeForm.append('contratto', contratto);
    filialeForm.append('filiale', selectedFiliale);

    //invio richiesta httpxml
    let richiestaAssistenzaFilialePromise = httpPost('php/ajax/get_attrezzature_per_filiale.php', filialeForm);

    //interpreto risposta
    richiestaAssistenzaFilialePromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                content += '<p class="elementi-da-selezionare font-medium border-bottom-1-red width-85"> Seleziona gli elementi che richiedono assistenza</p>';
                $.each(data[0], function (key, value) {
                    $.each(value, function (innerKey, innerValue) {
                        //aggiungo la categoria dell'attrezzatura
                        content += "<div id='" + innerKey + "' data-role='collapsible' data-inset='true' class='richiestaAssistenza-collapsible'><h3>" + innerKey.replace('_', ' ') + "</h3>";

                        //controllo se ci sono piu' di un elemento da visualizzare
                        if ($.isArray(innerValue)) {
                            //inserisco tutti gli elemeni
                            $.each(innerValue, function (lastKey, lastValue) {
                                //controllo se l'elemento ha una matricola
                                if (lastValue.MATRICOLA !== undefined) {
                                    if ($.isArray(lastValue.MATRICOLA)) {
                                        content += '<label><input type="checkbox" name="' + lastValue.PROGRESSIVO + '" id="' + lastValue.PROGRESSIVO + '">Nr: ' + lastValue.PROGRESSIVO + ' / Matricola: - </label>';
                                    }else
                                        content += '<label><input type="checkbox" name="' + lastValue.MATRICOLA + '" id="' + lastValue.MATRICOLA + '">Nr: ' + lastValue.PROGRESSIVO + ' / Matricola: ' + lastValue.MATRICOLA + '</label>';
                                }else if (lastValue.PROGRESSIVO !== undefined)
                                    content += '<label><input type="checkbox" name="' + lastValue.PROGRESSIVO + '" id="' + lastValue.PROGRESSIVO + '">Progressivo: ' + lastValue.PROGRESSIVO + '</label>';
                                else if (lastValue.CHIAVE !== undefined)
                                    content += '<label><input type="checkbox" name="' + lastValue.DESCRIZIONE + '" id="' + lastValue.DESCRIZIONE + '">Descrizione: ' + lastValue.DESCRIZIONE + '</label>';
                            });
                        } else {
                            if (innerValue.MATRICOLA !== undefined) {
                                if ($.isArray(innerValue.MATRICOLA))
                                    content += '<label><input type="checkbox" name="' + innerValue.PROGRESSIVO + '" id="' + innerValue.PROGRESSIVO + '">Nr: ' + innerValue.PROGRESSIVO + ' / Matricola: - </label>';
                                else
                                    content += '<label><input type="checkbox" name="' + innerValue.MATRICOLA + '" id="' + innerValue.MATRICOLA + '">Nr: ' + innerValue.PROGRESSIVO + ' / Matricola: ' + innerValue.MATRICOLA +  '</label>';
                            }else if (innerValue.PROGRESSIVO !== undefined)
                                content += '<label><input type="checkbox" name="' + innerValue.PROGRESSIVO + '" id="' + innerValue.PROGRESSIVO + '">Progressivo: ' + innerValue.PROGRESSIVO + '</label>';
                            else if (innerValue.DESCRIZIONE !== undefined)
                                content += '<label><input type="checkbox" name="' + innerValue.DESCRIZIONE + '" id="' + innerValue.DESCRIZIONE + '">Descrizione: ' + innerValue.DESCRIZIONE + '</label>';
                        }
                        content += '</div>';
                    })
                });

                $('#resultForCheck').append(content).trigger('create');
                // $('#noteAggiuntive').append('<label class="note-aggiuntive-label center-text blue-text border-bottom-1-red" for="areaNoteAggiuntive">Note aggiuntive </label>' +
                $('#noteAggiuntive').append('<textarea name="areaNoteAggiuntive" class="box-shadow-bottom" id="areaNoteAggiuntive" placeholder="Lasciare vuoto se non ci sono note aggiuntive"></textarea>').trigger('create');

                inviaRichiestaAssistenzaDati.removeClass('ui-disabled');
            } else {
                $('#assistenzaMessaggioErrore').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
            }
        }
    );
});

//gestisco il click sul pulsante di invio richiesta assistenza
$('#inviaRichiestaAssistenzaDati').on('click', function () {
    let i         = 1;
    let isEmpty   = true;
    let isMotiv   = true;
    let motivo    = $('#richiestaAssistenzaMotivoSelect').val();
    let contratto = $('#richiestaAssistenzaContrattoSelect').val();
    let filiale   = $('#richiestaAssistenzaFilialeSelect').val();
    let tecnico   = $('.info-tecnico .email').text();

    let noteAggiuntive = $('#areaNoteAggiuntive').val();

    if (motivo === 'Altro...') {
        if ($('#motivoAltroValue').val() === "") {
            isMotiv = false;
        } else {
            motivo = $('#motivoAltroValue').val();
        }
    }

    //controllo se sono stati inseriti tutti i campi
    if (motivo !== "Seleziona un motivo..." && contratto !== "Seleziona un contratto..." && filiale !== "Seleziona una filiale...") {

        let checked;
        let anagraficaPromise = httpPost('php/ajax/get_anagrafica.php');

        //interpreto risposta
        anagraficaPromise.then(
            function (data) {
                //controllo se ci sono stati errori nella chiamato
                if (data.result) {
                    checked = {"Motivo": motivo,
                        "Contratto": contratto,
                        "Filiale": filiale,
                        "Email": tecnico,
                        'attrezzature': {},
                        "Note aggiuntive": noteAggiuntive,
                        'raggione': data[0].RAGIONE_SOCIALE,
                        'indirizzo': data[0].INDIRIZZO_SPEDIZIONE,
                        'email': data[0].EMAIL,
                        'telefono': data[0].TELEFONO1,
                        'iva': data[0].PARTITA_IVA
                    };
                    console.log(checked);
                    console.log(checked.telefono);
                    let assistenzaFormData = new FormData();

                    $.each($('#resultForCheck').children(), function (key, value) {

                        if (value.tagName === 'DIV') {
                            let tipoAttrezzatura = $(value).attr('id');

                            checked.attrezzature[tipoAttrezzatura] = {};
                            i                                      = 1;

                            $.each($(value).children(), function (innerKey, innerValue) {
                                if (innerValue.tagName === 'DIV') {

                                    $.each($(innerValue).children(), function (lastKey, lastValue) {
                                        let input = $(lastValue).find('input');
                                        if ($(input).is(':checked')) {
                                            //TODO Controllare tutti i tipi esistenti
                                            if (tipoAttrezzatura === 'ESTINTORE' || tipoAttrezzatura === 'PORTA')
                                                checked.attrezzature[tipoAttrezzatura]['Matricola ' + tipoAttrezzatura.toLowerCase() + ' ' + i++] = ' ' + $(input).attr('id');
                                            else if (tipoAttrezzatura === 'LUCE')
                                                checked.attrezzature[tipoAttrezzatura]['Progressivo ' + tipoAttrezzatura.toLowerCase() + ' ' + i++] = ' ' + $(input).attr('id');
                                            else
                                                checked.attrezzature[tipoAttrezzatura]['Descrizione ' + tipoAttrezzatura.toLowerCase() + ' ' + i++] = ' ' + $(input).attr('id');
                                        }
                                    })
                                }
                            })
                        }
                    });


                    $.each(checked.attrezzature, function (key, value) {
                        if (!$.isEmptyObject(value))
                            isEmpty = false;
                    });

                    //controllo se e' stato inserito un motivo
                    if (!isMotiv) {
                        showError($('#error-content-popup'), 'Seleziona motivo', 'Inserire il motivo della richiesta di assistenza', 'error');
                    } else {
                        //controllo se ci sono dati da inviare
                        if (!isEmpty) {
                            //inizio animazione invio email
                            sendEmail($('#error-content-popup'), 'start', 'Sto inviando richiesta di assistenza...');

                            //recupero i dati da inviare al server
                            assistenzaFormData.append('assistenza', JSON.stringify(checked));

                            //invio richiesta httpxml
                            let richiediAssistenzaPromise = httpPost('php/ajax/send_email_assistenza.php', assistenzaFormData);

                            //interpreto la risposta
                            richiediAssistenzaPromise.then(
                                function (data) {
                                    //controllo se ci sono stati degli errori nella chiamata
                                    if (data.result) {
                                        //fermo animazione invio email
                                        sendEmail($('#error-content-popup'), 'stop');

                                        //notifico l'avvenuto invio email
                                        showError($('#error-content-popup'), "Mail inviata", "La richiesta di assistenza è stata inoltrata con successo", "success");
                                        setTimeout(function () {
                                            window.location.href = 'content.php';
                                        }, 1500)
                                    } else
                                        showError($('#error-content-popup'), "Email non spedita", "C'è stato un problema con l'invio della mail. Ripromare più tardi.", "error");
                                }
                            )
                            // assistenzaMessaggioErrore.append('<p class="center-text error-message text-shadow-none white-text">Selezionare tutti i valori richiesti</p>');
                        } else {
                            showError($('#error-content-popup'), "Selezionare attrezzatura", "Selezionare almeno una attrezzatura", "error");
                        }
                    }

                } else {
                }
            }
        );
    }
});

/**
 * Funzione che recupera i contratti dell'assistenza
 */
function getContrattiAssistenza() {
    //invio richiesta httpxml
    let contrattiPromise = httpPost('php/ajax/get_contratti.php');

    //interpreto la risposta
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
            } else {
                $('#assistenzaMessaggioErrore').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
            }
        }
    );
}

/**
 * Funzione che resetta i campi della pagina
 */
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

/**
 * Funzione che reccupera l'anagrafica relativa all'utente attualmente connesso
 */
function getAnagraficaValues() {
    //invio richiesta httpxml
    let anagraficaPromise = httpPost('php/ajax/get_anagrafica.php');

    //interpreto risposta
    anagraficaPromise.then(
        function (data) {
            //controllo se ci sono stati errori nella chiamato
            if (data.result) {
                console.log('get anagrafica');
                console.log(data);
                return data;
            } else {
                return null;
            }
        }
    );
}
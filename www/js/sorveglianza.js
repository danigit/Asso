'use strict';


$(document).ready(function () {
    var sorveglianzaContrattoPromise = httpPost('php/ajax/get_contratti.php');

    sorveglianzaContrattoPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {

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
});

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
        var attrezzaturePromise = httpPost('php/ajax/get_attrezzature.php');
        var i = 0;

        var domandePromise = httpPost('php/ajax/get_domande.php');

        var content = '';
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
                                            var label = innerValue.replace('LISTA_', '');
                                            content += "<div id='" + label + "' data-role='collapsible' data-inset='true'><h3>" + label + "</h3>";
                                            $.each(dom.domande, function (lastKey, lastValue) {
                                                if (label === lastKey) {
                                                    $.each(lastValue, function (k, v) {
                                                        content += '<input type="checkbox" checked id="' + i + '"><label for="' + i++ + '">' + v + '</label>';
                                                    })
                                                }
                                            });
                                            content += '</div>';
                                        });
                                        $('#questionarioSorveglianza').append(content).trigger('create');
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

$('#sorveglianzaCancellaDati').on('click', function () {
    $('#sorveglianzaFilialeSelect').removeClass('ui-disabled');
    $('#sorveglianzaContrattoSelect').removeClass('ui-disabled');
    $('#questionarioSorveglianza').empty();

    $('#sorveglianzaFilialeSelect').children('option:not(:first)').remove();
    $('#sorveglianzaFilialeSelect option:eq(0)').prop('selected', true);
    $('#sorveglianzaContrattoSelect option:eq(0)').prop('selected', true);
    $('#sorveglianzaFilialeSelect').selectmenu('refresh');
    $('#sorveglianzaContrattoSelect').selectmenu('refresh');
});


$('#sorveglianzaAggiungiModifica').on('click', function () {
    $('#sorveglianzaFilialeSelect').removeClass('ui-disabled');
    $('#sorveglianzaContrattoSelect').removeClass('ui-disabled');

    let i = 1;
    let isComplete = true;
    let snapShot = {};

    $.each($('#questionarioSorveglianza').children(), function (key, value) {

        if(value.tagName === 'DIV'){
            let tipoAttrezzatura = $(value).attr('id');
            snapShot[tipoAttrezzatura] = {};

            $.each($(value).children(), function (innerKey, innerValue) {
                if(innerValue.tagName === 'DIV') {
                    i = 1;
                    $.each($(innerValue).children(), function (lastKey, lastValue) {
                        var input = $(lastValue).find('input');
                        if($(input).is(':checked')) {
                            snapShot[tipoAttrezzatura][i++] = "ok";
                        }else {
                            snapShot[tipoAttrezzatura][i++] = 'no'
                        }
                    })
                }
            })
        }
    });

    let sorveglianzaTempSaveForm = new FormData();
    let sorveglianzaInfoContratto = $('#sorveglianzaContrattoSelect').val();
    let sorveglianzaInfoFiliale = $('#sorveglianzaFilialeSelect').val();
    snapShot['info'] = {'frequenza': $('#sorveglianzaRadioFieldset :radio:checked').val(), 'contratto': sorveglianzaInfoContratto, 'filiale': sorveglianzaInfoFiliale};


    console.log(snapShot);

    $.each(snapShot, function (key, value) {
        if (key !== 'info'){
            $.each(value, function (innerKey, innerValue) {
                if (innerValue === 'no') {
                    isComplete = false;
                    return false;
                }
            })
        }
    });

    if(isComplete) {
        sorveglianzaTempSaveForm.append('valori', JSON.stringify(snapShot));

        let sorveglianzaTempSavePromise = httpPost('php/ajax/temp_save_sorveglianza.php', sorveglianzaTempSaveForm);

        sorveglianzaTempSavePromise.then(
            function (data) {
                //controllo se ci sono stati degli errori nella chiamata
                if (data.result) {
                }
            }
        );
    }else {
        showError($('#error-sorveglianza-popup'), 'Sorveglianza', 'Mettere il ckeck su tutti i campi', 'error');
    }

    // $('#sorveglianzaFilialeSelect').children('option:not(:first)').remove();
    // $('#sorveglianzaFilialeSelect option:eq(0)').prop('selected', true);
    // $('#sorveglianzaContrattoSelect option:eq(0)').prop('selected', true);
    // $('#sorveglianzaFilialeSelect').selectmenu('refresh');
    // $('#sorveglianzaContrattoSelect').selectmenu('refresh');
    // $('#questionarioSorveglianza').empty();
});

function sendSorveglianza() {

}

function caricaModifiche() {
    let getTempSorveglianzaPromise = httpPost('php/ajax/get_temp_saved_sorveglianza.php');

    getTempSorveglianzaPromise.then(
        function (risposte) {
            //controllo se ci sono stati degli errori nella chiamata
            if (risposte.result) {
                $('#attrezzature').empty();
                console.log(risposte.domande.info[0]);
                if(!(risposte.domande.info[0] === "")) {
                    console.log($('#sorveglianzaRadioFieldset').attr('class'));
                    var checked = $("#sorveglianzaRadioFieldset input[type='radio']:checked").val();
                    $("#sorveglianzaRadioFieldset input:radio").attr('checked', false);
                    $("#sorveglianzaRadioFieldset input:radio").parent().find('label').removeClass('ui-radio-on ui-btn-active');


                    $("#sorveglianzaRadioFieldset").trigger('create');
                    $('input:radio[name="frequenza"]').filter('[value="' + risposte.domande.info[0] + '"]').attr('checked', 'checked');
                    $('input:radio[name="frequenza"]').filter('[value="' + risposte.domande.info[0] + '"]').parent().find('label').removeClass('ui-radio-off');
                    $('input:radio[name="frequenza"]').filter('[value="' + risposte.domande.info[0] + '"]').parent().find('label').addClass('ui-radio-on ui-btn-active');


                    $('#sorveglianzaContrattoSelect').val(risposte.domande.info[1]);
                    $('#sorveglianzaContrattoSelect').selectmenu('refresh');
                    $('#sorveglianzaFilialeSelect').removeClass('ui-disabled');
                    $('#sorveglianzaFilialeSelect').append('<option>' + risposte.domande.info[2] + '</option>');
                    $('#sorveglianzaFilialeSelect').val(risposte.domande.info[2]);
                    $('#sorveglianzaFilialeSelect').selectmenu('refresh');


                    let caricaattrezzaturePromise = httpPost('php/ajax/get_attrezzature.php');
                    let caricaDomandePromise = httpPost('php/ajax/get_domande.php');
                    let i = 0;
                    let j = 0;

                    let content = '';
                    caricaattrezzaturePromise.then(
                        function (data) {
                            //controllo se ci sono stati degli errori nella chiamata
                            if (data.result) {
                                caricaDomandePromise.then(
                                    function (dom) {
                                        if (dom.result) {
                                            $.each(data[0], function (key, value) {
                                                if (value.contratto === $('#sorveglianzaContrattoSelect').val()) {
                                                    $.each(value.lista, function (innerKey, innerValue) {
                                                        var label = innerValue.replace('LISTA_', '');
                                                        content += "<div id='" + label + "' data-role='collapsible' data-inset='true'><h3>" + label + "</h3>";
                                                        $.each(dom.domande, function (lastKey, lastValue) {
                                                            if (label === lastKey) {
                                                                j = 0;
                                                                $.each(lastValue, function (k, v) {
                                                                    if (label === 'ESTINTORI') {
                                                                        console.log('ESTINTORI: ' + risposte.domande.ESTINTORI[0]);
                                                                        if (risposte.domande.ESTINTORI[j++] === 'ok') {
                                                                            console.log('ESTINTORI SI');
                                                                            content += '<input type="checkbox" id="' + i + '" checked="checked"><label for="' + i++ + '">' + v + '</label>';
                                                                        } else {
                                                                            content += '<input type="checkbox" id="' + i + '"><label for="' + i++ + '">' + v + '</label>';
                                                                        }
                                                                    } else if (label === 'PORTE') {
                                                                        console.log('ESTINTORI: ' + risposte.domande.ESTINTORI[0]);
                                                                        if (risposte.domande.PORTE[j++] === 'ok') {
                                                                            console.log('ESTINTORI SI');
                                                                            content += '<input type="checkbox" id="' + i + '" checked="checked"><label for="' + i++ + '">' + v + '</label>';
                                                                        } else {
                                                                            content += '<input type="checkbox" id="' + i + '"><label for="' + i++ + '">' + v + '</label>';
                                                                        }
                                                                    } else if (label === 'LUCI') {
                                                                        console.log('ESTINTORI: ' + risposte.domande.ESTINTORI[0]);
                                                                        if (risposte.domande.LUCI[j++] === 'ok') {
                                                                            console.log('ESTINTORI SI');
                                                                            content += '<input type="checkbox" id="' + i + '" checked="checked"><label for="' + i++ + '">' + v + '</label>';
                                                                        } else {
                                                                            content += '<input type="checkbox" id="' + i + '"><label for="' + i++ + '">' + v + '</label>';
                                                                        }
                                                                    }
                                                                })
                                                            }
                                                        });
                                                        content += '</div>';
                                                    });
                                                    $('#questionarioSorveglianza').append(content).trigger('create');
                                                }
                                            })
                                        }
                                    }
                                );
                                $('#sorveglianzaAggiungiModifica').removeClass('ui-disabled');
                                $('#sorveglianzaInviaDati').removeClass('ui-disabled');
                            } else {
                                $('#attrezzature').append('<div class="center-text error-message"><span>' + data.message + '</span></div>');
                            }
                        }
                    );
                }
            }
        }
    );
}
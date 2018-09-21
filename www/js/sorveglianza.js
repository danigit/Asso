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
            }
        }
    );
});

$('#sorveglianzaContrattoSelect').on('change', function () {
    var sorveglianzaContratto = this.value;
    console.log('sorveglianza: ' + sorveglianzaContratto);

    var valoreFrequenza = $('#sorveglianzaRadioFieldset :radio:checked').val();
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
                    if(value.contratto === sorveglianzaContratto){
                        var sorveglianzaPromiseForm = new FormData();
                        sorveglianzaPromiseForm.append('contratto', value.contratto);
                        var sorveglianzaAttrezzaturePromise = httpPost("php/ajax/get_filiale_per_contratto.php", sorveglianzaPromiseForm);
                        sorveglianzaAttrezzaturePromise.then(
                            function (data) {
                                if(data.result){
                                    $.each(data.filiali, function (key, value) {
                                        $('#sorveglianzaFilialeSelect').append('<option>' + value + '</option>');
                                    })
                                }
                            }
                        )
                    }
                });
            }
        }
    );

    $('#sorveglianzaFilialeSelect').removeClass('ui-disabled');
    $('#sorveglianzaFilialeSelect').selectmenu('refresh');
});


$('#sorveglianzaFilialeSelect').on('change', function (e) {
    var attrezzaturePromise = httpPost('php/ajax/get_attrezzature.php');
    var i = 0;
    var questionarioEstintori;

    var domandePromise = httpPost('php/ajax/get_domande.php');



    var content = '';
    attrezzaturePromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                domandePromise.then(
                    function (dom) {
                        if (dom.result) {
                            console.log('result ok');
                            $.each(data[0], function (key, value) {
                                if(value.contratto === $('#sorveglianzaContrattoSelect').val()){
                                    $.each(value.lista, function (innerKey, innerValue) {
                                        var label = innerValue.replace('LISTA_', '');
                                        content += "<div id='" + label + "' data-role='collapsible' data-inset='true'><h3>" + label + "</h3>";
                                        $.each(dom.domande, function (lastKey, lastValue) {
                                            if (label === lastKey) {
                                                console.log('inside if: ' + label);
                                                $.each(lastValue, function (k, v) {
                                                    console.log('inside eache: ' + v);
                                                    content += '<input type="checkbox" id="' + i + '"><label for="' + i++ + '">' + v + '</label>';
                                                })
                                            }
                                        });
                                        content += '</div>';
                                        console.log('contratto: ' + innerValue);
                                    });
                                    $('#questionarioSorveglianza').append(content).trigger('create');
                                }
                            })

                        }
                    }
                );
            } else {
                $('#attrezzature').append('<div class="center-text error-message"><span>'+ data.message + '</span></div>');
            }
        }
    );

    $('#sorveglianzaInviaDati').removeClass('ui-disabled');

});


$('#sorveglianzaCancellaModifica').on('click', function () {
    $('#questionarioSorveglianza').empty();

    $('#sorveglianzaFilialeSelect').children('option:not(:first)').remove();
    $('#sorveglianzaFilialeSelect option:eq(0)').prop('selected', true);
    $('#sorveglianzaContrattoSelect option:eq(0)').prop('selected', true);
    $('#sorveglianzaFilialeSelect').selectmenu('refresh');
    $('#sorveglianzaContrattoSelect').selectmenu('refresh');
});


$('#sorveglianzaAggiungiModifica').on('click', function () {
    var i = 1;
    var snapShot = {};

    $.each($('#questionarioSorveglianza').children(), function (key, value) {

        if(value.tagName === 'DIV'){
            var tipoAttrezzatura = $(value).attr('id');
            console.log('tipo: ' + tipoAttrezzatura);
            snapShot[tipoAttrezzatura] = {};

            $.each($(value).children(), function (innerKey, innerValue) {
                if(innerValue.tagName === 'DIV') {
                    i = 1;
                    $.each($(innerValue).children(), function (lastKey, lastValue) {
                        var input = $(lastValue).find('input');
                        console.log('input ' + $(input).attr('id'));
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

    console.log(snapShot);
    var sorveglianzaTempSaveForm = new FormData();
    sorveglianzaTempSaveForm.append('valori', JSON.stringify(snapShot));

    var sorveglianzaTempSavePromise = httpPost('php/ajax/temp_save_sorveglianza.php', sorveglianzaTempSaveForm);

    sorveglianzaTempSavePromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                console.log(data);
            }
        }
    );
});
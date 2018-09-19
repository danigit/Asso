'use strict';

/**
 * Funzione che reccupera le fatture dell'utente attualmente connesso
 * Le visualizza dividendole per anno
 */
function getFatture(){

    var promise = httpPost('php/ajax/get_fatture.php');

    promise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                var years = Object.keys(data.fatture).reverse();
                //ordino le fatture in ordine decrescente per anno
                var fatture = Object.values(data.fatture).reverse();
                var i = 0;

                console.log(fatture[0]);
                $.each(fatture, function (key, value) {

                    // //divido le fatture per anni
                    var label = $('<a href="#" data-inset="false" class="fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + years[i++] + '</a>');
                    $('#fatture-list').append(label);
                    //
                    // //inserisco le fatture relative all'anno attuale
                    $.each(value, function (innerKey, innerValue) {

                        var content = "<div id='fattureCollapsable' data-role='collapsible' data-inset='false'><h3>" + innerKey + "</h3>";
                        content += insertContent(innerKey, innerValue);
                    //
                    //     content += '<div class="ui-grid-a ui-responsive">' +
                    //         '<div class="ui-block-a"><a href="#" onclick="app.openPdf(\'' + innerValue.path + '\');" id="visualizza" data-value="' + innerValue.numero + '" ' +
                    //         'class="ui-btn ui-shadow ui-corner-all visualizza-button margin-auto">Visualizza</a></div></div>';
                        content += '</div></div>';
                    //
                        $("#fatture-list").append( content ).collapsibleset('refresh');
                    });
                })
            } else {
                $('#fatture').append('<div class="center-text error-message"><span>' + data.message + '</span></div>');
            }
        }
    );
}

/**
 * Funzione che crea i campi interni ad ogni fattura
 * @param innerKey
 * @param innerValue
 * @returns {string} - il codice html da inserire nella pagina
 */
function insertContent( innerKey, innerValue) {

    var content = '', numero = 0;

    $.each(innerValue, function (lastKey, lastValue) {
        console.log(lastKey + '/' + lastValue.numero);

        content += "<div id='fattureCollapsableInner' data-role='collapsible' data-collapsed-icon='carat-d' data-expanded-icon='carat-u' data-iconpos='right' data-inset='true'><h3>Fattura nr. " + lastValue.numero + "</h3>";

        $.each(lastValue, function (k, v) {
            if(k !== 'contratto') {
                if (v !== "") {
                    if (k !== "path") {
                        //Questo e' per visualizzare numero e anno sulla stessa riga
                        if (k === 'numero') {
                            numero = v;
                        } else if (k === 'anno')
                            content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">NUMERO:</b> </p><p class="float-right line-wrap">'
                                + numero + '/' + parseString(k, v) + '</p></a>';
                        else
                            content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">' + k + ':</b> </p><p class="float-right line-wrap">'
                                + parseString(k, v) + '</p></a>';
                    }
                }
            }
        });

        content += '</div>';

    });

    return content;
}

//
// var promise = httpPost('php/ajax/get_fatture.php');
//
// promise.then(
//     function (data) {
//         //controllo se ci sono stati degli errori nella chiamata
//         if (data.result) {
//             //ordino le fatture in ordine decrescente per anno
//             var fatture = Object.values(data.fatture).reverse();
//             var i = 0;
//
//             $.each(fatture, function (key, value) {
//
//                 //divido le fatture per anni
//                 var label = $('<a href="#" data-inset="false" class="fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + fatture[i++][0]['anno'] + '</a>');
//                 $('#fatture-list').append(label);
//
//                 //inserisco le fatture relative all'anno attuale
//                 $.each(value, function (innerKey, innerValue) {
//
//                     var content = "<div data-role='collapsible' id='" + innerValue.numero + "' data-inset='false'><h3>Fattura nr. " + innerValue.numero + "</h3>";
//                     content += insertContent(innerKey, innerValue);
//
//                     content += '<div class="ui-grid-a ui-responsive">' +
//                         '<div class="ui-block-a"><a href="#" onclick="app.openPdf(\'' + innerValue.path + '\');" id="visualizza" data-value="' + innerValue.numero + '" ' +
//                         'class="ui-btn ui-shadow ui-corner-all visualizza-button margin-auto">Visualizza</a></div></div>';
//                     content += '</div></div>';
//
//                     $("#fatture-list").append( content ).collapsibleset('refresh');
//                 });
//             })
//         } else {
//             $('#fatture').append('<div class="center-text error-message"><span>' + data.message + '</span></div>');
//         }
//     }
// );
// }
//
// /**
//  * Funzione che crea i campi interni ad ogni fattura
//  * @param innerKey
//  * @param innerValue
//  * @returns {string} - il codice html da inserire nella pagina
//  */
// function insertContent( innerKey, innerValue) {
//
//     var content = '', numero = 0;
//
//     $.each(innerValue, function (lastKey, lastValue) {
//         if(lastKey !== 'contratto') {
//             if (lastValue !== "") {
//                 if (lastKey !== "path") {
//                     //Questo e' per visualizzare numero e anno sulla stessa riga
//                     if (lastKey === 'numero') {
//                         numero = lastValue;
//                     } else if (lastKey === 'anno')
//                         content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">NUMERO:</b> </p><p class="float-right line-wrap">'
//                             + numero + '/' + parseString(lastKey, lastValue) + '</p></a>';
//                     else
//                         content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">' + lastKey + ':</b> </p><p class="float-right line-wrap">'
//                             + parseString(lastKey, lastValue) + '</p></a>';
//                 }
//             }
//         }
//     });
//
//     return content;
// }
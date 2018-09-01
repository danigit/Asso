'use strict';

/**
 * Funzione che reccupera le fatture dell'utente attualmente connesso
 * Le visualizza dividendole per anno
 */
function getFatture(){

    var promise = httpPost('php/ajax/get_fatture.php');

    promise.then(
        function (data) {
            if (data.result) {
                var fatture = Object.values(data.fatture).reverse();
                var i = 0;

                $.each(fatture, function (key, value) {

                    var label = $('<a href="#" data-inset="false" class="fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + fatture[i++][0]['anno'] + '</a>');
                    $('#fatture-list').append(label);

                    $.each(value, function (innerKey, innerValue) {

                        var content = "<div data-role='collapsible' id='" + innerValue.numero + "' data-inset='false'><h3>Fattura nr. " + innerValue.numero + "</h3>";
                        content += insertContent(innerKey, innerValue);

                        content += '<div class="ui-grid-a ui-responsive">' +
                            '<div class="ui-block-a"><a href="#" onclick="app.open(\'' + innerValue.path + '\');" id="visualizza" data-value="' + innerValue.numero + '" ' +
                            'class="ui-btn ui-shadow ui-corner-all visualizza-button">Visualizza</a></div></div>';
                        content += '</div></div>';

                        $("#fatture-list").append( content ).collapsibleset('refresh');
                    });
                })
            } else {
                $('#fatture').append('<div class="center-text error-message"><span>Impossibile reccuperare le fatture</span></div>');
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
        if(lastValue !== "") {
            if(lastKey !== "path") {
                //Questo e' per visualizzare numero e anno sulla stessa riga
                if(lastKey === 'numero'){
                    numero = lastValue;
                }else if(lastKey === 'anno')
                    content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">NUMERO:</b> </p><p class="float-right line-wrap">'
                        + numero + '/' + parseString(lastKey, lastValue) + '</p></a>';
                else
                    content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">' + lastKey + ':</b> </p><p class="float-right line-wrap">'
                        + parseString(lastKey,lastValue) + '</p></a>';
            }
        }
    });

    return content;
}
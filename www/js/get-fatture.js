'use strict';

/**
 * Funzione che reccupera le fatture dell'utente attualmente connesso
 * Le visualizza dividendole per anno
 */
function getFatture(){

    let promise = httpPost('php/ajax/get_fatture.php');

    promise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                let years = Object.keys(data.fatture).reverse();

                //ordino le fatture in ordine decrescente per anno
                let fatture = Object.values(data.fatture).reverse();
                let i = 0;
                let content;
                let label;
                let isFirst = true;
                let collapsibleSet;

                $.each(fatture, function (key, value) {
                    console.log(value);

                    //divido le fatture per anni
                    if (isFirst) {
                        label = '<div data-role="collapsible" data-inset="false" class="margin-bottom-10 collapsible-year-div" data-collapsed="false"><h3 class="collapsible-year">' + years[i++] + '</h3>';
                        isFirst = false;
                    }else{
                        label = '<div data-role="collapsible" data-inset="false" class="margin-bottom-10 collapsible-year-div"><h3 class="collapsible-year">' + years[i++] + '</h3>';
                    }

                    collapsibleSet = '<div data-role="collapsible-set" data-inset="false" data-content-theme="d">';

                    //inserisco le fatture relative all'anno attuale
                    $.each(value, function (innerKey, innerValue) {

                        content = "<div id='fattureCollapsable' data-role='collapsible' data-inset='true' class='margin-bottom-10'><h3>" + innerKey + "</h3>";
                        content += insertContent(innerKey, innerValue);
                        collapsibleSet += content + '</div>';
                    });

                    label += collapsibleSet + '</div></div>';
                    $("#fatture-list").append( label ).collapsibleset('refresh');
                })
            } else {
                $('#fatture').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
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

    let content = '', numero = 0;
    let collapsibleSet = '<div data-role="collapsible-set" data-inset="false" data-content-theme="d">';

    $.each(innerValue, function (lastKey, lastValue) {
        content += "<div id='fattureCollapsableInner' data-role='collapsible' data-collapsed-icon='carat-d' data-expanded-icon='carat-u' " +
            "data-iconpos='right' data-inset='true'><h3 class='box-shadow-bottom'>Fattura nr. " + lastValue.numero + "</h3>";

        $.each(lastValue, function (k, v) {
            if(k !== 'contratto') {
                if (v !== "") {
                    if (k !== "path") {
                        //Questo e' per visualizzare numero e anno sulla stessa riga
                        if (k === 'numero') {
                            numero = v;
                        } else if (k === 'anno')
                            content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">NUMERO</b> </p><p class="float-right line-wrap">'
                                + numero + ' / ' + parseString(k, v) + '</p></a>';
                        else
                            content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">' +
                                k.toUpperCase() + '</b> </p><p class="float-right line-wrap">' + parseString(k, v) + '</p></a>';
                    }
                }
            }
        });
        content += '</div>';
    });

    collapsibleSet += content + '</div>';
    return collapsibleSet;
}
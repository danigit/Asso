/**
 * Funzione che esegue una chiamata xmlhttp
 * @param url - indirizzo url
 * @param input - i valori da passare alla chiamata
 * @param async
 * @returns {Promise} - la risposta della chiamata
 */
function httpPost(url, input) {
    return new Promise(function (resolve, reject) {
        var httpReq = new XMLHttpRequest();
        httpReq.open('POST', url, true);
        httpReq.onreadystatechange = function () {
            if(httpReq.readyState === 4){
                if(httpReq.status === 200){
                    resolve(JSON.parse(httpReq.responseText));
                }else{
                    reject(httpReq.statusText);
                }
            }
        };
        httpReq.send(input);
    });
}

/**
 * Funzione che modifica le stringe che non possono essere visualizzate cosi come sono
 * @param key
 * @param stringValue - la stringa da modificare
 * @returns {*}
 */
function parseString(key, stringValue) {

    if(key === 'pagata' && stringValue === '0')
        return 'si';
    else if(key === 'pagata' && stringValue === '0')
        return false;
    else if(key === 'importo' && stringValue.length > 2)
        return stringValue.substr(0, stringValue.length - 2) + '.' + stringValue.substr(stringValue.length - 2);
    else
        return stringValue;
}

function resetSelection(elementName) {
    $('#' + elementName).children('option:not(:first)').remove();
    selectDefaultForSelection(elementName);
}

function selectDefaultForSelection(elementName) {
    $('#' + elementName + ' option:eq(0)').prop('selected', true);
    $('#' + elementName).selectmenu('refresh');
}

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

function showError(errorPopup, title, content, type) {
    let elem = errorPopup;
    if(type === 'success') {
        elem.find('img').remove();
        elem.removeClass('error-popup email-popup');
        elem.find('.title').removeClass('error-title email-title');
        elem.find('.content').removeClass('error-content email-content');
        elem.find('.title').addClass('success-title');
        elem.find('.content').addClass('success-content');
        elem.addClass('success-popup');
        $('.success-title').text(title);
        $('.success-content').text(content);
        elem.popup();
        elem.popup("open");

    }else if(type === 'error'){
        elem.find('img').remove();
        elem.removeClass('success-popup email-popup success-title success-content email-title email-content');
        elem.find('.title').removeClass('success-title email-title');
        elem.find('.content').removeClass('success-content email-content');
        elem.find('.title').addClass('error-title');
        elem.find('.content').addClass('error-content');
        elem.addClass('error-popup');
        $('.error-title').text(title);
        $('.error-content').text(content);
        elem.popup();
        elem.popup("open");
    }

    setTimeout(function () {
        elem.popup("close");
    }, 200000000);
}

function sendEmail(errorPopup, state) {
    let elem = errorPopup;

    if(state === 'start') {
        // elem.css('width', '500px');
        elem.css('height', '150px');
        elem.removeClass('error-popup success-popup error-title error-content success-title success-content');
        elem.find('.title').removeClass('error-title success-title');
        elem.find('.contet').removeClass('error-content success-content');
        elem.addClass('email-popup');
        elem.find('.title').addClass('email-title');
        elem.find('.content').addClass('email-content');
        $('.email-title').text('Sto inviando richiesta di cambio anagrafica...');
        $('.email-content').text('');
        elem.append($('<img src="../www/img/email-5-64.ico" id="send-email-image">'));
        elem.popup();
        elem.popup('open');
    }else if(state === 'stop'){
        setTimeout(function () {
            elem.popup("close");
        }, 200000000);
    }
}

/**
 * Funzione che esegue una chiamata xmlhttp
 * @param url - indirizzo url
 * @param input - i valori da passare alla chiamata
 * @returns {Promise} - la risposta della chiamata
 */
function httpPost(url, input) {
    return new Promise(function(resolve, reject) {
        let httpReq = new XMLHttpRequest();
        httpReq.open('POST', url, true);
        httpReq.onreadystatechange = function() {
            if (httpReq.readyState === 4) {
                if (httpReq.status === 200) {
                    resolve(JSON.parse(httpReq.responseText));
                } else {
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

    if (key === 'pagata' && stringValue === '0')
        return 'SI';
    else if (key === 'pagata' && stringValue !== '0')
        return 'NO';
    else if (key === 'importo' && stringValue.length > 2)
        return stringValue.substr(0, stringValue.length - 2) + '.' + stringValue.substr(stringValue.length - 2) + ' €';
    else
        return stringValue;
}

/**
 * Funzione che risetta un selettore
 * @param elementName - il selettore da risettare
 */
function resetSelection(elementName) {
    $('#' + elementName).children('option:not(:first)').remove();
    selectDefaultForSelection(elementName);
}

/**
 * Funzione che seleziona il valore di default di un selettore
 * @param elementName - il seletore per cui selezionare il valore di default
 */
function selectDefaultForSelection(elementName) {
    $('#' + elementName + ' option:eq(0)').prop('selected', true);
    $('#' + elementName).selectmenu('refresh');
}

/**
 * Funzione che mostra un messaggio popup
 * @param errorPopup - il popup da mostrare
 * @param title - il titolo della finestra
 * @param content - il contenuto della finesta
 * @param type - il tipo di popup
 */
function showError(errorPopup, title, content, type) {
    let elem = errorPopup;
    if (type === 'success') {
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

    } else if (type === 'error') {
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

    setTimeout(function() {
        elem.popup("close");
    }, 2000);
}

/**
 * Funzione che visualizza l'animazione della spedizione mail
 * @param errorPopup -il lmessaggio da mostrare
 * @param state - se deve iniziare o finire
 * @param text
 */
function sendEmail(errorPopup, state, text) {
    let elem = errorPopup;

    if (state === 'start') {
        // elem.css('width', '500px');
        elem.css('height', '150px');
        elem.removeClass('error-popup success-popup error-title error-content success-title success-content');
        elem.find('.title').removeClass('error-title success-title');
        elem.find('.contet').removeClass('error-content success-content');
        elem.addClass('email-popup');
        elem.find('.title').addClass('email-title');
        elem.find('.content').addClass('email-content');
        $('.email-title').text(text);
        $('.email-content').text('');
        elem.find('img').remove();
        elem.append($('<img src="' + HOST_ROOT + FIRST_LEVEL_FOLDER + SECOND_LEVEL_FOLDER + '/img/email-5-64.ico" id="send-email-image">'));
        elem.popup();
        elem.popup('open');
    } else if (state === 'stop') {
        elem.popup("close");
    }
}

/**
 * Funzione che crea un file csv a partire dai dati passati come parametro
 * @param csvData - i dati da inserire nel csv
 * @returns {*} - il file csv
 */
function createCsv(csvData) {
    let result, ctr, keys, columnDelimiter, lineDelimiter, innerData;

    innerData = csvData.data || null;

    if (innerData == null) {
        return null;
    }

    columnDelimiter = csvData.columnDelimiter || ',';
    lineDelimiter = csvData.lineDelimiter || '\n';

    keys = Object.keys(innerData[Object.keys(innerData)[0]][0]);

    result = '';

    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    Object.values(innerData).forEach(function(item) {
        Object.values(item).forEach(function(innerItem) {
            ctr = 0;

            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;
                let arrayVal = '';
                if ($.isArray(innerItem[key])) {
                    $.each(innerItem[key], function(key, value) {
                        arrayVal += 'Bochello' + (key + 1) + ' ';
                    });
                    result += arrayVal;
                } else
                    result += innerItem[key];
                ctr++;
            });

            result += lineDelimiter;
        });
    });

    return result;
}

/**
 * Funzione che salva sul computer un file csv
 * @param csvData - il nome del file
 * @param data - i dati del file
 */
function downloadCsv(csvData, data) {
    let fileName, link;

    let csv = createCsv(data);

    if (csv == null) return;

    fileName = csvData.filename || 'Attrezzature.csv';

    // if (!csv.match(/^data:text\/csv/i)){
    //     csv = 'data:text/csv;charset=utf-8;' + csv;
    // }

    // innerData = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(new Blob([csv], {
        type: 'application/octet-stream'
    })));
    link.setAttribute('download', fileName);
    link.click();
}
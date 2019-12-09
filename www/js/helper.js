/**
 * Funzione che esegue una chiamata xmlhttp
 * @param url - indirizzo url
 * @param input - i valori da passare alla chiamata
 * @returns {Promise} - la risposta della chiamata
 */
function httpPost(url, input) {
    return new Promise(function (resolve, reject) {
        let httpReq = new XMLHttpRequest();
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
        return 'SI';
    else if(key === 'pagata' && stringValue !== '0')
        return 'NO';
    else if(key === 'importo' && stringValue.length > 2)
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

    if(state === 'start') {
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
        elem.append($('<img src="../Asso/img/email-5-64.ico" id="send-email-image">'));
        elem.popup();
        elem.popup('open');
    }else if(state === 'stop'){
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

    if(innerData == null) {
        return null;
    }

    columnDelimiter = csvData.columnDelimiter || ',';
    lineDelimiter = csvData.lineDelimiter || '\n';

    keys = Object.keys( innerData[Object.keys(innerData)[0]][0] );

    result = '';

    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    Object.values(innerData).forEach(function (item) {
        Object.values(item).forEach(function (innerItem) {
            ctr = 0;

            keys.forEach(function (key) {
                if (ctr > 0) result += columnDelimiter;
                let arrayVal = '';
                if ($.isArray(innerItem[key])){
                    $.each(innerItem[key], function (key, value) {
                        arrayVal += 'Bochello' + (key + 1) + ' ';
                    });
                    result += arrayVal;
                }else
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

window.mobilecheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};
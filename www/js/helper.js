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
        return 'SI';
    else if(key === 'pagata' && stringValue !== '0')
        return 'NO';
    else if(key === 'importo' && stringValue.length > 2)
        return stringValue.substr(0, stringValue.length - 2) + '.' + stringValue.substr(stringValue.length - 2) + ' €';
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
    }, 2000);
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
        elem.append($('<img src="../Asso/img/email-5-64.ico" id="send-email-image">'));
        elem.popup();
        elem.popup('open');
    }else if(state === 'stop'){
        elem.popup("close");
    }
}

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

                result += innerItem[key];
                ctr++;
            });

            result += lineDelimiter;
        });
    });

    return result;
}

function downloadCsv(csvData, data) {
    let fileName, link;

    let csv = createCsv(data);

    if (csv == null) return;

    console.log('csv data: ');
    console.log(csv);
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

function createAttrezzaturePdf(pdfData) {
    console.log('inside saving pdf')
    let content = $('#attrezzature-pdf-content');
    let header = Object.keys( pdfData.data[Object.keys(pdfData.data)[0]][0] );
    let table, thead, trow;
    let body;

    // let info = $('<div class="clear-float-left">' +
    //     '<p class="font-large float-left margin-zero margin-right-10px"><b>Incaricato Sig: </b></p><p class="float-left font-medium margin-zero margin-top-2px">' + data.info.incaricato + '</p>' +
    //     '<p class="float-right font-medium margin-zero margin-top-2px">' + data.time + '</p><p class="font-large float-right margin-zero margin-right-10px"><b>Data: </b></p></div>');
    //
    // content.append(info);


    table = $(
        '<table data-role="table" id="attrezzature-table" data-mode="reflow" class="ui-responsive margin-top-80px"></table>');
    thead = $('<thead></thead>');
    trow = $('<tr></tr>');

    $.each(header, function (k, v) {
        // console.log(v);
        // console.log($.isPlainObject(v));

        let th = $('<th data-priority="1" class="border-1-black background-gra center-text">' + v.replace('_', ' ') + '</th>');

        trow.append(th);
    });

    thead.append(trow);
    table.append(thead);

    body = $('<tbody id="attrezzature-body"></tbody>');

    $.each(pdfData.data, function (key, value) {
        // console.log(value);
        $.each(value, function (innerKey, innerValue) {
            console.log(innerValue);
            let tr = $('<tr></tr>');
            header.forEach(function (key) {
                console.log(innerValue[key]);
                tr.append($('<th class="border-1-black center-text font-medium">' + innerValue[key] + '</th>'));
            });
            body.append(tr);
        })
    });

    table.append(body).trigger('create');
    content.append(table);
    let url = window.location.href;
    let first = url.split('#');
    window.location.href = first[0] + '#attrezzature-pdf';
    setTimeout(function () {
        generateAttrezzaturePdf();
    },2000)
}

function generateAttrezzaturePdf() {
    let pdfHtml = document.getElementById('attrezzature-pdf-content');
    html2canvas(pdfHtml, {
        onrendered: function(canvas) {
            console.log('inside render');
            let img = canvas.toDataURL('image/png');
            console.log('canvas getted');
            let doc = new jsPDF({orientation: 'l', unit: 'pt', format: 'a4'});
            doc.addImage(img, 'JPEG', 10, 10);

            let binary = doc.output('datauri');
            console.log('binary');
            console.log(binary);
            let pdfForm = new FormData();
            console.log('stringify');
            pdfForm.append('pdf', binary);

            console.log(pdfForm.get('pdf'));

            // let pdfPromise = httpPost('php/ajax/send_email_pdf.php', pdfForm);
            //
            // pdfPromise.then(
            //     function (data) {
            //         if (data.result) {
            //             console.log('pdf sent');
            //             console.log(data)
            //         }
            //     }
            // );

            doc.save('attrezzature.pdf')
        }
    });
}
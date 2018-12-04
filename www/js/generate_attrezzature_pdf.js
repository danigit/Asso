'use strict';

let attrezzatureNextRowPosH = 140;
let attrezzatureNextRowPosL = 30;
let attrezzatureNextRowH = 20;
let attrezzatureCurrentH = 140;
let attrezzatureText = '';
let attrezzatureSplitedText;
let attrezzatureI = 1;

let attrezzatureDoc = new jsPDF('l', 'pt', 'a4');

function createAttrezzaturePdf(data) {

    console.log(data.data);
    console.log(data.contratto);
    // sendEmail($('#error-sorveglianza-popup'), 'start');

    attrezzatureDoc.setFillColor(255, 255, 255);
    attrezzatureDoc.rect(20, 20, 802, 555, 'FD');

    attrezzatureDoc.setFontSize(10);
    attrezzatureDoc.setFontStyle('bold');
    attrezzatureDoc.text('Contratto: ', 30, 40);
    attrezzatureDoc.setFontStyle('normal');
    attrezzatureDoc.text(data.contratto, 90, 40);

    attrezzatureDoc.setFontStyle('bold');
    attrezzatureDoc.text('Data ', 720, 40);
    attrezzatureDoc.setFontStyle('normal');
    attrezzatureDoc.text(data.nowData, 750, 40);

    // attrezzatureDoc.setFillColor(204, 205, 206);
    // attrezzatureDoc.rect(20, 60, 802, 20, 'FD');

    let columns = [];
    $.each(data.data[Object.keys(data.data)[0]][0], function (key, value) {
        // console.log(value);
        columns.push(key.replace('_', ' '));
    });

    let rows = [];

    $.each(data.data, function (key, value) {
        $.each(value, function (innerKey, innerValue) {
            let row = [];
            $.each(innerValue, function (lastKey, lastValue) {
                row.push(lastValue);
            });
            rows.push(row);
        })
    });

    console.log(rows);

    attrezzatureDoc.autoTable(columns, rows, {
            theme: 'grid',
            startY: 80,
            margin: 24,
            pageBreak: 'auto',
            showHeader: 'everyPage',
            styles: {
                fontSize: 10,
                overflow: 'linebreak',
                textColor: 10,
                halign: 'center',
                columnWidth: 'auto'
            },
            headerStyles: {
                lineColor: 100,
                fontStyle: 'bold',
                overflow: 'ellipsize',
                fillColor: [204, 205, 206]
            }
        }
    );

    attrezzatureDoc.save('test.pdf');
}
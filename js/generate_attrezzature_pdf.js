'use strict';

/**
 * Funzione che crea il pdf delle attrezzature passate come parametro
 * @param dataReceived - i dati da inserire nel pdf
 */
function createAttrezzaturePdf(dataReceived) {
    let data = manipulateData(dataReceived);

    let attrezzatureDoc = new jsPDF('l', 'pt', 'a4');

    attrezzatureDoc.setFillColor(255, 255, 255);
    attrezzatureDoc.rect(20, 20, 802, 555, 'FD');

    attrezzatureDoc.setFontSize(10);
    attrezzatureDoc.setFontStyle('bold');
    attrezzatureDoc.text('Contratto: ', 30, 40);
    attrezzatureDoc.setFontStyle('normal');
    attrezzatureDoc.text(dataReceived.contratto, 90, 40);

    attrezzatureDoc.setFontStyle('bold');
    attrezzatureDoc.text('Data ', 720, 40);
    attrezzatureDoc.setFontStyle('normal');
    attrezzatureDoc.text(dataReceived.nowData, 750, 40);

    let columns = [];

    //recupero i valori dell'header della tabella
    $.each(data[0], function (key, value) {
        $.each(value, function (lastKey, lastValue) {
            columns.push(lastKey);
        });
    });


    let rows = [];

    //recupero i dati delle righe
    $.each(data, function (innerKey, innerValue) {
        let row = [];
        $.each(innerValue, function (lastKey, lastValue) {
            $.each(lastValue, function (key, value) {
                let val = value;
                if ($.isArray(value)) {
                    val = '';
                    $.each(value, function (finalKey, finalValue) {
                        val += 'Bocchello ' + (finalKey + 1) + ', ';
                    });
                    row.push(val);
                } else
                    row.push(val);
            });
        });
        rows.push(row);
    });

    //cambio la grafica della tabella
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

    //controllo se sono su mobile o meno
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        let blobFile = attrezzatureDoc.output();

        //salvo il pdf sul server
        savePdfOnServer(blobFile);

        //recupero il pdf salvato per visualizzarlo
        setTimeout(function () {
            app.openPdf('http://www.assoantincendio.com/areaclienti/PhoenixData/Attrezzature.pdf');
        }, 5000)
    }else {
        //salvo le attrezzature sul computer
        attrezzatureDoc.save('Attrezzature.pdf');
    }
}

/**
 * Funzione che cambia i valori passati come parametro
 * @param data - i dati da cambiare
 */
function manipulateData(data) {
    let manipulatedData = {};

    $.each(data.data, function (key, value) {
        $.each(value, function (innerKey, innerValue) {
            let values = [];
            $.each(innerValue, function (lastKey, lastValue) {
                switch (lastKey) {
                    case 'PROGRESSIVO': values.push({'PROG.': lastValue});
                        break;
                    case 'TIPOLOGIA': values.push({'TIPO': lastValue});
                        break;
                    case 'MATRICOLA': values.push({'MAT.': lastValue});
                        break;
                    case 'CLASSE_FUOCO': values.push({'CLASSE': lastValue});
                        break;
                    case 'ANNO_COSTRUZIONE': values.push({'COSTRUZ.': lastValue});
                        break;
                    case 'SCADENZA_REVISIONE': values.push({'SCAD. REV.': lastValue});
                        break;
                    case 'SCADENZA_COLLAUDO': values.push({'SCAD. COL.': lastValue});
                        break;
                    case 'ANNO_SOSTITUZIONE': values.push({'SOST.': lastValue});
                        break;
                    case 'MARCA_MANIGLIONE': values.push({'MARCA MANIGL.': lastValue});
                        break;
                    case 'MANIGLIA_ESTERNA': values.push({'MANIGLIA ESTER.': lastValue});
                        break;
                    case 'DIMENSIONE' : values.push({'DIM.': lastValue});
                        break;
                    case 'INSTALLAZIONE' : values.push({'INSTAL.': lastValue});
                        break;
                    case 'TIPO_PORTA': values.push({'TIPO': lastValue});
                        break;
                    case 'MARCA_LUCE': values.push({'MARCA': lastValue});
                        break;
                    case 'TIPO_LUCE': values.push({'TIPO': lastValue});
                        break;
                    case 'DESCRIZIONE': values.push({'DESCR.': lastValue});
                        break;
                    case 'TARATURA_VALVOLE': values.push({'TARATURE VALV.': lastValue});
                        break;
                    case 'VALVOLE_RICAMBIO': values.push({'VALVOLE RIC.': lastValue});
                        break;
                    case 'QUANTITA_VALVOLE': values.push({'QTA. VALV.': lastValue});
                        break;
                    default: {
                        let obj = {};
                        obj[lastKey] = lastValue;
                        values.push(obj);
                    }
                }
            });
            manipulatedData[innerKey] = values;
        });
    });
    return manipulatedData;
}
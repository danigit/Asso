
function createPdf(data) {
    console.log(data);
    let content = $('#pdf-content');
    let table;
    let body;

    let frequency = $('<div><p class="float-left margin-right-50px font-medium">Check-list sorveglianza</p>' +
        '<div class="float-left">' +
        '<div class="float-left margin-right-10px"><label class="font-x-small padding-left-30px"><input type="radio" name="frequency-pdf" id="mensile-pdf" value="on" checked="checked">Mensile</label></div>' +
        '<div class="float-left margin-right-10px"><label class="font-x-small padding-left-30px"><input type="radio" name="frequency-pdf" id="bimestrale-pdf" value="off">Bimestrale</label></div>' +
        '<div class="float-left margin-right-10px"><label class="font-x-small padding-left-30px"><input type="radio" name="frequency-pdf" id="trimestrale-pdf" value="off">Trimestrale</label></div>' +
        '</div>' +
        '</div><br><br><br><br>')

    let info = $('<div class="clear-float-left">' +
        '<p class="font-medium float-left"><b>Incaricato Sig:</b>' + data.info.frequenza + '</p><p class="font-medium float-right"><b>Data:</b>' + data.time + '</p></div>');


    content.append(frequency);
    content.append(info);

    $.each(data, function (k, v) {
        console.log(k);
        console.log($.isPlainObject(v));
        if ($.isPlainObject(v) && k !== 'info') {
            if(k === "ESTINTORI"){
                table = $(
                    '<table data-role="table" id="sorveglianza-table" data-mode="reflow" class="ui-responsive">' +
                    '<thead>' +
                    '<tr>' +
                    '<th colspan="2" data-priority="1" class="border-1-black background-gray">Estintori portatili / carrellati:</th>' +
                    '<th></th>' +
                    '</tr>' +
                    '</thead>' +
                    '</table>');
            }else if (k === 'LUCI'){
                table = $(
                    '<table data-role="table" id="sorveglianza-table" data-mode="reflow" class="ui-responsive">' +
                    '<thead>' +
                    '<tr>' +
                    '<th colspan="2" data-priority="1" class="border-1-black background-gray">Luci di sicurezza:</th>' +
                    '<th></th>' +
                    '</tr>' +
                    '</thead>' +
                    '</table>');
            }else if (k === 'PORTE'){
                table = $(
                    '<table data-role="table" id="sorveglianza-table" data-mode="reflow" class="ui-responsive">' +
                    '<thead>' +
                    '<tr>' +
                    '<th colspan="2" data-priority="1" class="border-1-black background-gray">Porte tagliafuoco</th>' +
                    '<th></th>' +
                    '</tr>' +
                    '</thead>' +
                    '</table>');
            }

            body = $('<tbody id="sorveglianza-body"></tbody>');
            console.log('body');
            console.log(body);
            $.each(v, function (innerKey, innerValue) {
                console.log('innerKey');
                console.log(innerKey);
                console.log('innerValue');
                console.log(innerValue);
                let question = innerValue.question.substr(3);
                let checked = innerValue.checked;
                console.log('checked');
                console.log(checked);
                if (checked === "1") {
                    body.append($('<tr>' +
                        '<th class="border-1-black width-3 center-text padding-11px font-medium">' + innerKey + '</th>' +
                        '<th class="border-1-black padding-0">' +
                        '<table data-role="table" data-mode="reflow" class="ui-responsive">' +
                        '<thead class="display-none"><tr><th></th><th></th><th></th></tr></thead>' +
                        '<tbody><tr>' +
                        '<th class="font-medium padding-zero padding-9px">' + question + '</th>' +
                        '<th class="width-5 padding-zero"><label class="font-small margin-right-10px"><input type="checkbox" name="si" checked="checked">SI</label></th> ' +
                        '<th class="width-5 padding-zero"><label class="font-small margin-right-10px"><input type="checkbox" name="no">NO</label></th> ' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>' +
                        '</th>' +
                        '</tr>'))
                } else if (checked === "0") {
                    body.append($('<tr>' +
                        '<th class="border-1-black width-3 center-text padding-11px font-medium">' + innerKey + '</th>' +
                        '<th class="border-1-black padding-0">' +
                        '<table data-role="table" data-mode="reflow" class="ui-responsive">' +
                        '<thead class="display-none"><tr><th></th><th></th><th></th></tr></thead>' +
                        '<tbody><tr>' +
                        '<th class="font-medium padding-zero padding-9px">' + question + '</th>' +
                        '<th class="width-5 padding-zero"><label class="font-small margin-right-10px"><input type="checkbox" name="si">SI</label></th> ' +
                        '<th class="width-5 padding-zero"><label class="font-small margin-right-10px"><input type="checkbox" name="no" checked="checked">NO</label></th> ' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>' +
                        '</th>' +
                        '</tr>'))
                } else {
                    body.append($('<tr>' +
                        '<th class="border-1-black width-3 center-text padding-11px font-medium">' + innerKey + '</th>' +
                        '<th class="border-1-black padding-0">' +
                        '<table data-role="table" data-mode="reflow" class="ui-responsive">' +
                        '<thead class="display-none"><tr><th></th><th></th><th></th></tr></thead>' +
                        '<tbody><tr>' +
                        '<th class="font-medium padding-zero padding-9px">' + question + '</th>' +
                        '<th class="width-5 padding-zero"><label class="font-small margin-right-10px"><input type="checkbox" name="si">SI</label></th> ' +
                        '<th class="width-5 padding-zero"><label class="font-small margin-right-10px"><input type="checkbox" name="no" checked="checked">NO</label></th> ' +
                        '</tr>' +
                        '<tr>' +
                        '<th class="border-top-1-black padding-0" colspan="3"><textarea class="margin-zero padding-tb-2px-lr-7px full-width border-none">Nota: ' + checked + '</textarea></th>' +
                        '</tr></tbody>' +
                        '</table>' +
                        '</th>' +
                        '</tr>'))

                }
            });

            table.append(body);
            content.append(table).trigger('create');
        }
    });

    let url = window.location.href;
    let first = url.split('#');
    window.location.href = first[0] + '#pdf-page';
    setTimeout(function () {
        generatePdf();
    },2000)
}

function generatePdf() {
    let pdfHtml = document.getElementById('pdf-content');
    html2canvas(pdfHtml, {
        onrendered: function(canvas) {
            console.log('inside render');
            let img = canvas.toDataURL('image/png');
            console.log('canvas getted');
            let doc = new jsPDF();
            doc.addImage(img, 'JPEG', 10, 10);

            let binary = doc.output('datauri');
            console.log('binary');
            console.log(binary);
            let pdfForm = new FormData();
            console.log('stringify');
            pdfForm.append('pdf', binary);

            console.log(pdfForm.get('pdf'));

            let pdfPromise = httpPost('php/ajax/send_email_pdf.php', pdfForm);

            pdfPromise.then(
                function (data) {
                    if (data.result) {
                        console.log('pdf sent');
                        console.log(data)
                    }
                }
            )

            doc.save('sorveglianza.pdf')
        }
    });
}
//
// function makePDF() {
//
//     var quotes = document.getElementById('container-fluid');
//
//     html2canvas(quotes, {
//         onrendered: function(canvas) {
//
//             //! MAKE YOUR PDF
//             var pdf = new jsPDF('p', 'pt', 'letter');
//
//             for (var i = 0; i <= quotes.clientHeight/980; i++) {
//                 //! This is all just html2canvas stuff
//                 var srcImg  = canvas;
//                 var sX      = 0;
//                 var sY      = 980*i; // start 980 pixels down for every new page
//                 var sWidth  = 900;
//                 var sHeight = 980;
//                 var dX      = 0;
//                 var dY      = 0;
//                 var dWidth  = 900;
//                 var dHeight = 980;
//
//                 window.onePageCanvas = document.createElement("canvas");
//                 onePageCanvas.setAttribute('width', 900);
//                 onePageCanvas.setAttribute('height', 980);
//                 var ctx = onePageCanvas.getContext('2d');
//                 // details on this usage of this function:
//                 // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
//                 ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);
//
//                 // document.body.appendChild(canvas);
//                 var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);
//
//                 var width         = onePageCanvas.width;
//                 var height        = onePageCanvas.clientHeight;
//
//                 //! If we're on anything other than the first page,
//                 // add another page
//                 if (i > 0) {
//                     pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
//                 }
//                 //! now we declare that we're working on that page
//                 pdf.setPage(i+1);
//                 //! now we add content to that page!
//                 pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62));
//
//             }
//             //! after the for loop is finished running, we save the pdf.
//             pdf.save('Test.pdf');
//         }
//     });
// }
// https://stackoverflow.com/questions/19272933/jspdf-multi-page-pdf-with-html-renderer
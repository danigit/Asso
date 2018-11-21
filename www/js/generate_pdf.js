
function createPdf(data) {
    console.log(data);
    let content = $('#pdf-content');
    let table;
    let body;

    let frequency = $('<div><p class="float-left margin-right-10px font-large"><b>Check-list sorveglianza:</b></p>' +
        '<p class="float-left font-medium margin-top-20">' + data.info.frequenza + '</p>' +
        '</div>');

    let info = $('<div class="clear-float-left">' +
        '<p class="font-large float-left margin-zero margin-right-10px"><b>Incaricato Sig: </b></p><p class="float-left font-medium margin-zero margin-top-2px">' + data.info.incaricato + '</p>' +
        '<p class="float-right font-medium margin-zero margin-top-2px">' + data.time + '</p><p class="font-large float-right margin-zero margin-right-10px"><b>Data: </b></p></div>');


    content.append(frequency);
    content.append(info);

    $.each(data, function (k, v) {
        console.log(k);
        console.log($.isPlainObject(v));
        if ($.isPlainObject(v) && k !== 'info') {
            if(k === "ESTINTORI"){
                table = $(
                    '<table data-role="table" id="sorveglianza-table" data-mode="reflow" class="ui-responsive margin-top-80px">' +
                    '<thead>' +
                    '<tr>' +
                    '<th colspan="2" data-priority="1" class="border-1-black background-gray">Estintori portatili / carrellati:</th>' +
                    // '<th></th>' +
                    '</tr>' +
                    '</thead>' +
                    '</table>');
            }else if (k === 'LUCI'){
                table = $(
                    '<table data-role="table" id="sorveglianza-table" data-mode="reflow" class="ui-responsive">' +
                    '<thead>' +
                    '<tr>' +
                    '<th colspan="2" data-priority="1" class="border-1-black background-gray">Luci di sicurezza:</th>' +
                    // '<th></th>' +
                    '</tr>' +
                    '</thead>' +
                    '</table>');
            }else if (k === 'PORTE'){
                table = $(
                    '<table data-role="table" id="sorveglianza-table" data-mode="reflow" class="ui-responsive">' +
                    '<thead>' +
                    '<tr>' +
                    '<th colspan="2" data-priority="1" class="border-1-black background-gray">Porte tagliafuoco</th>' +
                    // '<th></th>' +
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

// function generatePdf() {
//     let pdfHtml = document.getElementById('pdf-content');
//     html2canvas(pdfHtml, {
//         onrendered: function(canvas) {
//             console.log('inside render');
//             let img = canvas.toDataURL('image/png');
//             console.log('canvas getted');
//             let doc = new jsPDF();
//             doc.addImage(img, 'JPEG', 10, 10);
//
//             let binary = doc.output('datauri');
//             console.log('binary');
//             console.log(binary);
//             let pdfForm = new FormData();
//             console.log('stringify');
//             pdfForm.append('pdf', binary);
//
//             console.log(pdfForm.get('pdf'));
//
//             let pdfPromise = httpPost('php/ajax/send_email_pdf.php', pdfForm);
//
//             pdfPromise.then(
//                 function (data) {
//                     if (data.result) {
//                         console.log('pdf sent');
//                         console.log(data)
//                     }
//                 }
//             )
//
//             doc.save('sorveglianza.pdf')
//         }
//     });
// }
//
function generatePdf() {

    let quotes = document.getElementById('pdf-content');
    let j = 1;
    let i = 0;
    let prevOffset = 0;
    let prevObject;
    let multiplePage = false;
    // $.each($('#pdf-content').children(), function (key, value) {
    //     if($(value).attr('id') === 'sorveglianza-table') {
    //         $.each($(value).children(), function (innerKey, innerValue) {
    //             if($(innerValue).attr('id') === 'sorveglianza-body'){
    //                 let prevObject;
    //                 $.each($(innerValue).children(), function (lastKey, lastValue) {
    //                     let offset = $(lastValue).offset();
    //                     console.log(offset.top);
    //
    //                     if( offset.top > 420 * i){
    //                         offset = $(prevObject).offset().top;
    //                         console.log('offset: ' + offset);
    //                         i++;
    //                     }
    //                     prevObject = lastValue;
    //                 })
    //             }
    //         })
    //     }
    // })

    html2canvas(quotes, {
        onrendered: function(canvas) {

            //! MAKE YOUR PDF
            let pdf = new jsPDF('p', 'pt', 'a4');

            $.each($('#pdf-content').children(), function (key, value) {
                if($(value).attr('id') === 'sorveglianza-table') {
                    $.each($(value).children(), function (innerKey, innerValue) {
                        if($(innerValue).attr('id') === 'sorveglianza-body'){
                            $.each($(innerValue).children(), function (lastKey, lastValue) {
                                let offset = $(lastValue).offset().top + $(lastValue).height();
                                // console.log('offset outside: ' + offset);
                                if( offset > 960 * j ){
                                    multiplePage = true;
                                    offset = $(prevObject).offset().top + $(prevObject).height();
                                    console.log('offset inside: ' + offset);
                                    console.log('prevOffset: ' + prevOffset);
                                    let srcImg  = canvas;
                                    let sX      = 0;
                                    let sY      = prevOffset; // start 980 pixels down for every new page
                                    let sWidth  = 900;
                                    let sHeight = offset;
                                    let dX      = 0;
                                    let dY      = 0;
                                    let dWidth  = 900;
                                    let dHeight = offset;

                                    window.onePageCanvas = document.createElement("canvas");
                                    onePageCanvas.setAttribute('width', 900);
                                    onePageCanvas.setAttribute('height', offset - prevOffset);
                                    let ctx = onePageCanvas.getContext('2d');
                                    // details on this usage of this function:
                                    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
                                    console.log('drawing immage: ' + sX + ', ' + sY + ', ' + sWidth + ', ' + sHeight + ', ' + dWidth + ', ' + dHeight);
                                    ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

                                    // document.body.appendChild(canvas);
                                    let canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

                                    let width         = onePageCanvas.width;
                                    let height        = onePageCanvas.clientHeight;

                                    //! If we're on anything other than the first page,
                                    // add another page
                                        pdf.addPage(); //8.5" x 11" in pts (in*72)
                                    //! now we declare that we're working on that page
                                    pdf.setPage(j);
                                    //! now we add content to that page!
                                    pdf.addImage(canvasDataURL, 'JPEG', 25, 25);
                                    j++;
                                    i++;
                                    prevOffset = offset;
                                }

                                console.log('offset after: ' + offset);
                                console.log('prevOffset after: ' + prevOffset);
                                prevObject = lastValue;
                            })
                        }
                    })
                }
            });

            if(multiplePage){
                console.log('prev offset true: ' + prevOffset);
                let heightImage = $('#pdf-content').offset().top + $('#pdf-content').height() + 15;
                heightImage = heightImage - prevOffset;
                let srcImg  = canvas;
                let sX      = 0;
                let sY      = prevOffset; // start 980 pixels down for every new page
                let sWidth  = 900;
                let sHeight = heightImage;
                let dX      = 0;
                let dY      = 0;
                let dWidth  = 900;
                let dHeight = heightImage;

                window.onePageCanvas = document.createElement("canvas");
                onePageCanvas.setAttribute('width', 900);
                onePageCanvas.setAttribute('height', heightImage);
                let ctx = onePageCanvas.getContext('2d');
                // details on this usage of this function:
                // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
                console.log('drawing immage true: ' + sX + ', ' + sY + ', ' + sWidth + ', ' + sHeight + ', ' + dWidth + ', ' + dHeight);
                ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

                // document.body.appendChild(canvas);
                let canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

                let width         = onePageCanvas.width;
                let height        = onePageCanvas.clientHeight;

                //! If we're on anything other than the first page,
                // add another page
                //     pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
                //! now we declare that we're working on that page
                pdf.setPage(j);
                //! now we add content to that page!
                pdf.addImage(canvasDataURL, 'PNG', 25, 25);
            }

            if(!multiplePage){
                console.log('not multiple page');
                let heightImage = $('#pdf-content').offset().top + $('#pdf-content').height();
                let srcImg  = canvas;
                let sX      = 0;
                let sY      = 0; // start 980 pixels down for every new page
                let sWidth  = 900;
                let sHeight = heightImage;
                let dX      = 0;
                let dY      = 0;
                let dWidth  = 900;
                let dHeight = heightImage;

                window.onePageCanvas = document.createElement("canvas");
                onePageCanvas.setAttribute('width', 900);
                onePageCanvas.setAttribute('height', heightImage - prevOffset);
                let ctx = onePageCanvas.getContext('2d');
                // details on this usage of this function:
                // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
                console.log('drawing immage false: ' + sX + ', ' + sY + ', ' + sWidth + ', ' + sHeight + ', ' + dWidth + ', ' + dHeight);
                ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

                // document.body.appendChild(canvas);
                let canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

                let width         = onePageCanvas.width;
                let height        = onePageCanvas.clientHeight;

                //! If we're on anything other than the first page,
                // add another page
                //     pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
                //! now we declare that we're working on that page
                pdf.setPage(j);
                //! now we add content to that page!
                pdf.addImage(canvasDataURL, 'PNG', 25, 25);
            }
            //! after the for loop is finished running, we save the pdf.
            pdf.save('Test.pdf');
        }
    });
}
// https://stackoverflow.com/questions/19272933/jspdf-multi-page-pdf-with-html-renderer
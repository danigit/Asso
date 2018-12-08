'use strict';

let nextRowPosH = 140;
let nextRowPosL = 30;
let nextRowH = 20;
let currentH = 140;
let text = '';
let splitedText;
let i = 1;

let checkImg = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA+Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2ODApLCBkZWZhdWx0IHF1YWxpdHkK/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8AAEQgAEAAQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A9Y1X4h+FNJ0q51CXXLGZIAcxW86SSOwONqqDknPH/wBaqPhLUPFviWddb1FItH0aQZtdO8rfPKp6PI5+7nrgD/6/m1/8KtQm1nWTJZ6hPp0kt7cWVhH5YgW4kLLE+d4woXYemQRjoOffhwBQB//Z';

let doc = new jsPDF('p', 'pt', 'a4');

function createPdf(data) {

    sendEmail($('#error-sorveglianza-popup'), 'start');

    doc.setFillColor(255, 255, 255);
    doc.rect(20, 20, 555, 802, 'FD');

    doc.setFontSize(10);
    doc.setFontStyle('bold');
    doc.text('Check-list sorveglianza: ', 370, 40);
    doc.setFontStyle('normal');
    doc.text(data.info.frequenza, 500, 40);
    doc.setFontStyle('bold');
    doc.text('Incaricato Sig.: ', 30, 40);
    doc.setFontStyle('normal');
    doc.text(data.info.incaricato, 110, 40);
    doc.setFontStyle('bold');
    doc.text('Data:', 460, 60);
    doc.setFontStyle('normal');
    doc.text(data.time, 500, 60);
    doc.setFontSize(14);
    doc.setFontStyle('bold');
    doc.text(data.info.contratto, 150, 90);
    doc.setFontSize(12);
    doc.setFontStyle('normal');
    doc.text('Filiale: ', 260, 105);
    doc.setFontStyle('normal');
    doc.text(data.info.filiale, 300, 105);

    $.each(data, function (key, value) {
        if (key === 'ESTINTORI'){
            doc.setFillColor(204, 205, 206);
            doc.rect(30, 120, 535, 20, 'FD');
            doc.setFontSize(12);
            doc.setFontStyle('bold');
            doc.text('Estintori portatili / carrellati', 40, 134);
            doc.text('SI', 500, 134);
            doc.text('NO', 540, 134);
            insertElementType(value);
        }else if (key === 'PORTE') {
            insertHeader('Porte tagliafuoco');
            insertElementType(value);
        }else if(key === 'SPRINKLER'){
            insertHeader('Sprinkler');
            insertElementType(value);
        }else if(key === 'RILEVATORI_FUMI'){
            insertHeader('Rilevatori fumi');
            insertElementType(value);
        }else if(key === 'LUCI'){
            insertHeader('Luci');
            insertElementType(value);
        }else if(key === 'IDRANTI'){
            insertHeader('Idranti');
            insertElementType(value);
        }
    });

    let binary = doc.output('datauri');
    // console.log('binary');
    // console.log(binary);
    let pdfForm = new FormData();
    // console.log('stringify');
    pdfForm.append('pdf', binary);
    pdfForm.append('email', data.info.email);

    // console.log(pdfForm.get('pdf'));

    let pdfPromise = httpPost('php/ajax/send_email_pdf.php', pdfForm);

    pdfPromise.then(
        function (data) {
            if (data.result) {
                sendEmail($('#error-sorveglianza-popup'), 'stop');
                showError($('#error-sorveglianza-popup'), 'Email spedita', 'La richiesta di cambio anagrafica è stata ' +
                    'innoltrata con successo', 'success');

                setTimeout(function () {
                    window.location.href = 'content.php';
                }, 1700);
            }
        }
    );

    doc.save('test.pdf');
}

function insertHeader(header) {
    if(currentH + 50 > 800){
        changePage();
    }
    doc.setFillColor(204, 205, 206);
    doc.rect(30, currentH + 30, 535, 20, 'FD');
    doc.setFontSize(12);
    doc.setFontStyle('bold');
    doc.text(header, 40, currentH + 44);
    doc.text('SI', 500, currentH + 44);
    doc.text('NO', 540, currentH + 44);
    currentH += 50;
    nextRowPosH = currentH;
}

function insertElementType(value) {
    
    $.each(value, function (innerKey, innerValue) {
        if (innerValue.checked === '1') {
            if(currentH + 20 > 800){
                changePage();
            }
            doc.setFillColor(255, 255, 255);
            doc.rect(nextRowPosL, nextRowPosH, 535, nextRowH, 'FD');
            doc.setFontSize(10);
            doc.setFontStyle('normal');
            doc.text(innerValue.question + innerKey, nextRowPosL + 5, nextRowPosH + 14);
            doc.addImage(checkImg, 'JPEG', 500, nextRowPosH + 2, 16, 16);
            currentH += 20;
        }else if(innerValue.checked === '0'){
            if (currentH + 20 > 800){
                changePage();
            }
            doc.setFillColor(255, 255, 255);
            doc.rect(nextRowPosL, nextRowPosH, 535, nextRowH, 'FD');
            doc.setFontSize(10);
            doc.setFontStyle('normal');
            doc.text(innerValue.question, nextRowPosL + 5, nextRowPosH + 14);
            doc.addImage(checkImg, 'JPEG', 540, nextRowPosH + 2, 16, 16);
            currentH += 20;
        }else{
            text = 'Note: ' + innerValue.checked;
            if (innerKey === '1')
                splitedText = doc.splitTextToSize(text, 670);
            else
                splitedText = doc.splitTextToSize(text, 520);

            if (splitedText.length === 1) {
                if (currentH + 40 > 800){
                    changePage();
                }
                doc.setFillColor(255, 255, 255);
                doc.rect(nextRowPosL, nextRowPosH, 535, nextRowH, 'FD');
                doc.setFontSize(10);
                doc.setFontStyle('normal');
                doc.text(innerValue.question, nextRowPosL + 5, nextRowPosH + 14);
                doc.addImage(checkImg, 'JPEG', 540, nextRowPosH + 2, 16, 16);
                doc.setFillColor(255, 255, 255);
                doc.rect(nextRowPosL, nextRowPosH + 20, 535, nextRowH, 'FD');
                doc.text(nextRowPosL + 5, nextRowPosH + 34, splitedText);
                currentH += 40;
            }else {
                if ((currentH +  splitedText.length * 14) > 800){
                    changePage();
                    currentH += splitedText.length * 14;
                }
                console.log('after change page: ' + currentH);
                doc.setFillColor(255, 255, 255);
                doc.rect(nextRowPosL, nextRowPosH, 535, nextRowH, 'FD');
                doc.setFontSize(10);
                doc.setFontStyle('normal');
                doc.text(innerValue.question, nextRowPosL + 5, nextRowPosH + 14);
                doc.addImage(checkImg, 'JPEG', 540, nextRowPosH + 2, 16, 16);
                doc.setFillColor(255, 255, 255);
                doc.rect(nextRowPosL, nextRowPosH + 20, 535, splitedText.length * 14, 'FD');
                doc.text(nextRowPosL + 5, nextRowPosH + 34, splitedText);
                currentH += splitedText.length * 14;
            }
        }

        nextRowPosH = currentH;
    });
}
function changePage(breakPoint) {
        console.log('adding page')
        doc.addPage('a4');
        console.log('changing page');
        doc.setPage(++i);

        doc.setFillColor(255, 255, 255);
        doc.rect(20, 20, 555, 802, 'FD');

        nextRowPosH = 40;
        nextRowPosL = 30;
        nextRowH = 20;
        currentH = 40;
}

function createPdf(data) {

}

function generatePdf() {
    html2canvas(document.getElementById('pdf-content'), {
        onrendered: function(canvas) {
            console.log('inside render');
            let img = canvas.toDataURL('image/png');
            let doc = new jsPDF();
            console.log(doc);
            doc.addImage(img, 'JPEG', 10, 10);
            console.log(doc);
            doc.save('sorveglianza.pdf')
        }
    });
}
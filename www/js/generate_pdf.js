function generatePdf() {
    //
    // let doc = new jsPDF();
    //
    // doc.fromHTML($('#pdf-content').get(0), 20, 20, {
    //     'width': 500});
    //
    // doc.save('sorveglianza.pdf');


    html2canvas(document.getElementById('pdf-content'), {
        onrendered: function(canvas) {
            console.log('inside render');
            let img = canvas.toDataURL('image/png');
            let doc = new jsPDF();
            console.log(doc);
            doc.addImage(img, 'JPEG', 20, 20);
            doc.save('sorveglianza.pdf')
        }
    });
}
/**
 * Funzione che salva il pdf pasatto come parametro sul server
 * @param blob - il pdf da salvare sotto forma di blob
 */
function savePdfOnServer(blob) {

    //racolgo i dati da inviare
    let blobForm = new FormData();
    blobForm.append('blob', blob);

    //invio richiesta xmlhttp
    let blobPdfPromise = httpPost('php/ajax/save_pdf.php', blobForm);

    //interpreto risposta
    blobPdfPromise.then(
        function (data) {
            if (data.result) {
                // console.log('file sended');
            } else {
                // console.log('error on sending file');
            }
        }
    );
}
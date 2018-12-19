/**
 * Funzione che fa il logout dell'utente
 */

$('#logout').on('click', function () {

    //invio richiesta httpxml
    let promise = httpPost('php/ajax/logout.php');

    //interpreto risposta
    promise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {
                //ritorna all'area non protetta
                window.location.replace('index.php');
            }
        }
    );
});
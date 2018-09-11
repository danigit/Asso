/**
 * Funzione che fa il logout dell'utente
 */

$('#logout').on('click', function () {
    var promise = httpPost('php/ajax/logout.php');
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
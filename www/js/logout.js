/**
 * Funzione che fa il logout dell'utente
 */

$('#logout').on('click', function () {
    var promise = httpPost('php/ajax/logout.php');
    promise.then(
        function (data) {
            if (data.result) {
                window.location.replace('../index.php');
            }
        }
    );
});
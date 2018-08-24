$('#logout').on('click', function () {
    var promise = httpPost('php/ajax/logout.php');

    promise.then(
        function (data) {
            if(data.result){
                window.location.replace('../www/index.html');
            }else {
                //TODO mostrare il messaggio di errore ritornato;
            }
        }
    );
});
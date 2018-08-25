console.log('logout loaded');
$('#logout').on('click', function () {
    var promise = httpPost('php/ajax/logout.php');
    console.log('logout');
    promise.then(
        function (data) {
            if(data.result){
                window.location.replace('../www/index.php');
            }else {
                //TODO mostrare il messaggio di errore ritornato;
            }
        }
    );
});
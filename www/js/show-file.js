$(document).on('click', function (event) {
    if(event.target.id === 'visualizza'){
        // window.location.replace('../www/php/ajax/show_file.php');
        event.preventDefault();

        var fatturaForm = new FormData();
        console.log(event.target);
        var numero = $(event.target).attr('data-value');
        console.log('numero: ' + numero);
        fatturaForm.append('numero', '' + numero);

        console.log("form: " + fatturaForm.get('numero'));
        var promise = httpPost('php/ajax/show_file.php', fatturaForm);

        promise.then(
            function (data) {
                if(data.result){
                    window.open('../www/PhoenixData/' + data.path);
                }else {
                    $('#' + numero).children().eq(0).append('<div class="center-text text-shadow-none text-transfor-none error-message margin-zero">Impossibile visualizzare il file</div>');
                }
            }
        );
    }
});
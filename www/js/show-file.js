$(document).on('click', function (event) {
    if(event.target.id === 'visualizza'){
        // window.location.replace('../www/php/ajax/show_file.php');
        event.preventDefault();

        var fatturaForm = new FormData();
        var numero = $('#' + event.target.id).attr('data-value');
        fatturaForm.append('numero', '' + numero);

        console.log("form: " + fatturaForm.get('numero'));
        var promise = httpPost('php/ajax/show_file.php', fatturaForm);

        promise.then(
            function (data) {
                if(false){
                    window.open('../www/PhoenixData/' + data.path);
                }else {
                    app.alert();
                    // $('body').append('<div data-role="popup" id="popupBasic">' +
                    //     '<p>This is a completely basic popup, no options set.</p>' +
                    //     '</div>');
                    // $('#popupBasic').trigger('create');
                    // $('#popupBasic').popup();
                    // $('#popupBasic').popup('open');
                }
            }
        );
    }
});
$(document).on('click', function (event) {

    var target = event.target;

    if(event.target.id === 'visualizza'){
        // window.location.replace('../www/php/ajax/show_file.php');
        event.preventDefault();

        var viewNumero = $(event.target).attr('data-value');
        var viewForm = new FormData();
        viewForm.append('numero', '' + viewNumero);

        var viewPromise = httpPost('php/ajax/show_file.php', viewForm);

        viewPromise.then(
            function (data) {
                if(data.result){
                    window.open('../www/PhoenixData/' + data.path);
                }else {
                    $('#' + viewNumero).children().eq(0).append('<div class="center-text text-shadow-none text-transfor-none error-message margin-zero">Impossibile visualizzare il file</div>');
                }
            }
        );
    }else if(event.target.id === 'scarica'){
        if(!$(event.target).is("[download]")) {
            console.log('download null');
            event.preventDefault();

            var saveNumero = $(event.target).attr('data-value');
            var saveForm = new FormData();
            saveForm.append('numero', '' + saveNumero);

            var downloadPromise = httpPost('php/ajax/show_file.php', saveForm);

            downloadPromise.then(
                function (data) {
                    if (data.result) {
                        $(event.target).attr('href', '../www/PhoenixData/' + data.path);
                        $(event.target).attr('download', 'fattura_nr_' + saveNumero);
                        $(event.target).attr('target', '_blank');
                        $(event.target).text('Scarica');
                    } else {
                        $('#' + saveNumero).children().eq(0).append('<div class="center-text text-shadow-none text-transfor-none error-message margin-zero">Impossibile visualizzare il file</div>');
                    }
                }
            );
        }
    }
});
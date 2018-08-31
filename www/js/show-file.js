$(document).on('click', function (event) {


    //TODO trovare un altro modo per fare questo che non sia programmare per coppia incolla
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
                    window.open('../PhoenixData/' + data.path);
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
                        $('#scarica').removeClass('carica-button').addClass('visualizza-button');
                    } else {
                        $('#' + saveNumero).children().eq(0).append('<div class="center-text text-shadow-none text-transfor-none error-message margin-zero">Impossibile visualizzare il file</div>');
                    }
                }
            );
        }
    }else if(event.target.id === 'rapporto'){
        //TODO non tutte le fatture hanno un rapporto quindi bisogna veder ecome fare
        //cosi non posso meterlo nella pagina fatture ma devo fare una pagina separata
        event.preventDefault();

        var rapportoNumero = $(event.target).attr('data-value');
        var rapportoForm = new FormData();
        rapportoForm.append('numero', '' + rapportoNumero);

        var rapportoPromise = httpPost('php/ajax/show_file.php', rapportoForm);

        rapportoPromise.then(
            function (data) {
                if(data.result){
                    var rapporto = data.path.split('.').slice(0, -1).join('.') + '-Registro.pdf';
                    console.log(rapporto);
                    window.open('../www/PhoenixData/' + rapporto);
                }else {
                    $('#' + rapportoNumero).children().eq(0).append('<div class="center-text text-shadow-none text-transfor-none error-message margin-zero">Impossibile visualizzare il file</div>');
                }
            }
        );
    }
});
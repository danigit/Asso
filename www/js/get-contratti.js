'use strict';

/**
 * Funzione che reccupera i contratti relativi all'utente attualmente connesso
 * Divide i contratti in attivi e cessati
 */
function getContratti() {
    var contrattiPromise = httpPost('php/ajax/get_contratti.php');

    contrattiPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {

                $.each(data[0], function (key, value) {

                    //TODO capire che tipo di valore ha key, con alcuni utenti ritorna un numero con altri una stringa
                    //controllo se l'elemento corrente e' un contratto attivo o meno
                    if(key === 0 || key === '0'){
                        var contrattiAttivi = "<div data-role='collapsible' class='contratti-collapsible' data-collapsed='false'><h3>Contratti attivi</h3>";
                        var contrattiAttiviList = '';

                        //inserisco i contratti attivi
                        $.each(value, function (innerKey, innerValue) {

                            //TODO inserire l'url del host dove risiedera il sito
                            contrattiAttiviList += '<a href="#" onclick="app.openPdf(\''+ innerValue.path + '\');" class="ui-btn">' + innerValue.nome + ' / '
                                + innerValue.data.split('/').pop() + '</a>';
                        });

                        contrattiAttivi += contrattiAttiviList + '</div>';
                        $("#contratti-list").append( contrattiAttivi ).collapsibleset('refresh');
                    }else{
                        var contrattiCessati = "<div data-role='collapsible' class='contratti-collapsible'><h3>Contratti cessati</h3>";
                        var contrattiCessatiList = '';

                        //inserisco i contratti non attivi
                        $.each(value, function (innerKey, innerValue) {

                            //TODO inserire l'url del host dove risiedera il sito
                            contrattiCessatiList += '<a href="#" onclick="app.openPdf(\'' + innerValue.path + '\');" class="ui-btn">' + innerValue.nome + ' / '
                                + innerValue.data.split('/').pop() + '</a>';
                        });

                        contrattiCessati += contrattiCessatiList + '</div>';
                        $("#contratti-list").append( contrattiCessati ).collapsibleset('refresh');
                    }
                })
            } else {
                $('#contratti').append('<div class="center-text error-message"><span>' + data.message + '</span></div>');
            }
        }
    );
}
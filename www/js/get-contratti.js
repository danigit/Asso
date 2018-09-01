'use strict';

/**
 * Funzione che reccupera i contratti relativi all'utente attualmente connesso
 * Divide i contratti in attivi e cessati
 */
function getContratti() {
    var contrattiPromise = httpPost('php/ajax/get_contratti.php');

    contrattiPromise.then(
        function (data) {
            if (data.result) {

                $.each(data[0], function (key, value) {

                    //TODO capire che tipo di valore ha key, con alcuni utenti ritorna un numero con altri una stringa
                    if(key === 0 || key === '0'){
                        console.log('inside key 0');
                        var contrattiAttivi = "<div data-role='collapsible' class='contratti-collapsible' data-collapsed='false'><h3>Contratti attivi</h3>";
                        var contrattiAttiviList = '';

                        $.each(value, function (innerKey, innerValue) {

                            //TODO inserire l'url del host dove risiedera il sito
                            var pathAttivi = 'http://www.danielfotografo.altervista.org/PhoenixData/' + innerValue.path;
                            contrattiAttiviList += '<a href="#" onclick="app.open(\'' + pathAttivi + '\');" class="ui-btn">' + innerValue.nome + ' / '
                                + innerValue.data.split('/').pop() + '</a>';
                        });

                        contrattiAttivi += contrattiAttiviList + '</div>';
                        $("#contratti-list").append( contrattiAttivi ).collapsibleset('refresh');
                    }else{
                        console.log('inside key 1');
                        var contrattiCessati = "<div data-role='collapsible' class='contratti-collapsible'><h3>Contratti cessati</h3>";
                        var contrattiCessatiList = '';

                        $.each(value, function (innerKey, innerValue) {

                            //TODO inserire l'url del host dove risiedera il sito
                            var pathCessati = 'http://www.danielfotografo.altervista.org/PhoenixData/' + innerValue.path;
                            contrattiCessatiList += '<a href="#" onclick="app.open(\'' + pathCessati + '\');" class="ui-btn">' + innerValue.nome + ' / '
                                + innerValue.data.split('/').pop() + '</a>';
                        });

                        contrattiCessati += contrattiCessatiList + '</div>';
                        $("#contratti-list").append( contrattiCessati ).collapsibleset('refresh');
                    }
                })
            } else {
                $('#contratti').append('<div class="center-text error-message"><span>Impossibile reccuperare i contratti</span></div>');
            }
        }
    );
}
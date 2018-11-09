'use strict';

/**
 * Funzione che reccupera i contratti relativi all'utente attualmente connesso
 * Divide i contratti in attivi e cessati
 */
function getContratti() {
    let contrattiPromise = httpPost('php/ajax/get_contratti.php');

    contrattiPromise.then(
        function (data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {

                $.each(data[0], function (key, value) {

                    //TODO capire che tipo di valore ha key, con alcuni utenti ritorna un numero con altri una stringa
                    //controllo se l'elemento corrente e' un contratto attivo o meno
                    if(key === 0 || key === '0'){
                        insertContract(value, 'CONTRATTI ATTIVI', 'false');
                    }else{
                        insertContract(value, 'CONTRATTI CESSATI', 'true');
                    }
                })
            } else {
                $('#contratti').append('<div class="center-text error-message"><span class="font-large">' + data.message + '</span></div>');
            }
        }
    );
}

function insertContract(value, title, collapse){
    let contrattiAttivi = "<div data-role='collapsible' class='contratti-collapsible' data-collapsed='" + collapse + "'><h3>" + title + "</h3>";
    let contrattiAttiviList = '';

    //inserisco i contratti attivi
    $.each(value, function (innerKey, innerValue) {

        //TODO inserire l'url del host dove risiedera il sito
        contrattiAttiviList += '<a href="#" onclick="app.openPdf(\''+ innerValue.path + '\');" class="ui-btn margin-top-12 ' +
            'box-shadow-bottom border-radius-10">' + innerValue.nome + ' / ' + innerValue.data.split('/').pop() + '</a>';
    });

    contrattiAttivi += contrattiAttiviList + '</div>';
    $("#contratti-list").append( contrattiAttivi ).collapsibleset('refresh');
}
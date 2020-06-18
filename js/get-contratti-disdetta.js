'use strict';

/**
 * Funzione che reccupera i contratti relativi all'utente attualmente connesso
 * Divide i contratti in attivi e cessati
 */
function getContrattiDisdetta() {

    //invio richiesta httpxml
    let contrattiPromise = httpPost('php/ajax/get_contratti.php');

    //interpreto risposta
    contrattiPromise.then(
        function(data) {
            //controllo se ci sono stati degli errori nella chiamata
            if (data.result) {

                $.each(data[0], function(key, value) {

                    //TODO capire che tipo di valore ha key, con alcuni utenti ritorna un numero con altri una stringa
                    //controllo se l'elemento corrente e' un contratto attivo o meno
                    if (key === 0 || key === '0') {
                        insertContractDis(value, 'CONTRATTI ATTIVI');
                    } else {
                        insertContractDis(value, 'CONTRATTI CESSATI');
                    }
                })
            } else {
                console.error('Impossibile recuperare i contratti');
            }
        }
    );
}

/**
 * Funzione che inserisce i valori passati come parametro nella pagina
 * @param value - i valori da inserire
 * @param title - il nome del collapsible
 */
function insertContractDis(value, title) {
    let contrattiAttivi = "<h3>" + title + "</h3>";
    let contrattiAttiviList = '';

    console.log(value)

    //inserisco i contratti attivi
    $.each(value, function(innerKey, innerValue) {
        //TODO inserire l'url del host dove risiedera il sito
        //<label><input type="checkbox" class="checkcontratti" name="pippo" id="pippo" IdContratto="635782">Descrizione: pippopopopopop </label>
        //contrattiAttiviList += '<label> <input type="checkbox" class="checkcontratti" name="pippo" id="pippo" IdContratto="635782">Descrizione: pippopopopopop </label>'
        contrattiAttiviList += '<label> <input type="checkbox" class="checkcontratti" name=" ' + innerValue.nome + '" id="' + innerValue.id + '" IdContratto="' + innerValue.id + '">' + innerValue.nome + ' </label>';

    });

    contrattiAttivi += contrattiAttiviList;
    $("#lista-contratti-disdetta").append(contrattiAttivi).trigger('create');
}
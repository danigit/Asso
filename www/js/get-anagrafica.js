function getAnagrafica() {
    console.log('inside anagrafica');
    var anagraficaPromise = httpPost('php/ajax/get_anagrafica.php');

    anagraficaPromise.then(
        function (data) {
            if (data.result) {
                console.log('anag: ' + $.trim(data[0].Anagrafica.PARTITA_IVA) + '-');
                var anagrafica = '<ul data-role="listview" data-inset="true">' +
                    '<li data-role="list-divider">Ragione Sociale</li>' +
                    '<h4 class="center-text text-transfor-none">' +  getValue(data[0].Anagrafica.RAGIONE_SOCIALE) + '</h4>' +
                    '<li data-role="list-divider">Indirizzo fatturazione </li>' +
                    '<h4 class="center-text text-transfor-none">' + getValue(data[0].Anagrafica.INDIRIZZO_FATTURAZIONE) + '</h4>' +
                    '<li data-role="list-divider">Indirizzo spedizione</li>' +
                    '<h4 class="center-text text-transfor-none">' + getValue(data[0].Anagrafica.INDIRIZZO_SPEDIZIONE) + '</h4>' +
                    '<li data-role="list-divider">Partita IVA</li>' +
                    '<h4 class="center-text text-transfor-none">' + getValue(data[0].Anagrafica.PARTITA_IVA) + '</h4>' +
                    '<li data-role="list-divider"> Codice fiscale</li>' +
                    '<h4 class="center-text text-transfor-none">' + getValue(data[0].Anagrafica.CODICE_FISCALE) + '</h4>' +
                    '<li data-role="list-divider">E-mail </li>' +
                    '<h4 class="center-text text-transfor-none">' + getValue(data[0].Anagrafica.EMAIL) + '</h4>' +
                    '<li data-role="list-divider">Telefono </li>' +
                    '<h4 class="center-text text-transfor-none">' + getValue(data[0].Anagrafica.TELEFONO1) + '</h4>' +
                    '<li data-role="list-divider">Cellulare </li>' +
                    '<h4 class="center-text text-transfor-none">' + getValue(data[0].Anagrafica.CELLULARE) + '</h4>' +
                    '</ul>';
                $('#anagrafica').append(anagrafica).trigger('create');
            } else {
                //TODO mostrare il messaggio di errore ritornato;

            }
        }
    );
}
function getAnagrafica() {
    console.log('inside anagrafica');
    var anagraficaPromise = httpPost('php/ajax/get_anagrafica.php');

    anagraficaPromise.then(
        function (data) {
            if (data.result) {
                console.log('anag: ' + $.trim(data[0].RAGIONE_SOCIALE) + '-');
                var anagrafica = '<ul data-role="listview" data-inset="true">';
                $.each(data[0], function (key, value) {
                    anagrafica += '<li data-role="list-divider">' + key.replace('_', ' ') + '</li>' +
                    '<h4 class="center-text text-transfor-none">' +  value + '</h4>';
                });
                anagrafica += '</ul>';
                $('#anagrafica').append(anagrafica).trigger('create');
            } else {
                //TODO mostrare il messaggio di errore ritornato;
            }
        }
    );
}
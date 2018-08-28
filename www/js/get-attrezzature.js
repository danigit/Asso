function getAttrezzature() {
    console.log('inside attrezzature');
    var attrezzaturePromise = httpPost('php/ajax/get_attrezzature.php');

    attrezzaturePromise.then(
        function (data) {
            if (data.result) {
                console.log('anag: ' + $.trim(data[0]) + '-');
                var label = $('<a href="#" data-inset="false" class="margin-bottom-50 fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + data[0].contratto + '</a>');
                $('#attrezzature-container').append(label);
                //TODO da scrivere meglio cosi fa schifo
                var lista = '<ul data-role="listview" data-inset="false">';
                for(var i = 0; i < data[0]['lista'].length; i++){
                    var name = data[0]['lista'][i].replace(/LISTA_/g, '');
                    lista += '<a href="#' + name.toLowerCase() + '" class="ui-btn">' + name + '</li>';
                }
                lista += '</ul>';
                $('#attrezzature-container').append(lista).trigger('create');
            } else {
                //TODO mostrare il messaggio di errore ritornato;
            }
        }
    );
}
function getFatture(){

    var promise = httpPost('php/ajax/get_fatture.php');

    promise.then(
        function (data) {
            if (data.result) {
                //TODO redirect sulla pagina giusta
                $i = 0;
                $.each(data.fatture, function (key, value) {
                    var label = $('<a href="#" data-inset="false" class="ui-shadow ui-btn ui-corner-all ui-header">' + key + '</a>');
                    $('#fatture-list').append(label);

                    $.each(value, function (innerKey, innerValue) {
                        var content = "<div data-role='collapsible' id='" + innerValue.numero + "'><h3>Fattura nr. " + innerValue.numero + "</h3>" +
                            '<p>Anno: ' + innerValue.anno + '</p>' +
                            '<p>Data: ' + innerValue.data + '</p>' +
                            '<p>Importo: ' + innerValue.importo + '</p>' +
                            '<p>Contratto: ' + innerValue.contratto + '</p>' +
                            '<p>Pagato: ' + innerValue.pagata + '</p>' +
                            '</div>';
                        $("#fatture-list").append( content ).collapsibleset('refresh');
                    });
                })
            } else {
                //TODO mostrare il messaggio di errore ritornato;
            }
        }
    );
}
function getFatture(){

    var promise = httpPost('php/ajax/get_fatture.php');

    promise.then(
        function (data) {
            if (data.result) {
                //TODO redirect sulla pagina giusta
                $i = 0;
                $.each(data.fatture, function (key, value) {
                    var label = $('<a href="#" data-inset="false" class="fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + key + '</a>');
                    $('#fatture-list').append(label);

                    $.each(value, function (innerKey, innerValue) {
                        var content = "<div data-role='collapsible' id='" + innerValue.numero + "'><h3>Fattura nr. " + innerValue.numero + "</h3>" +
                            '<p><b class="blue-text">Anno:</b> ' + innerValue.anno + '</p>' +
                            '<p><b class="blue-text">Data:</b> ' + innerValue.data + '</p>' +
                            '<p><b class="blue-text">Importo:</b> ' + innerValue.importo + '</p>' +
                            '<p><b class="blue-text">Contratto:</b> ' + innerValue.contratto + '</p>' +
                            '<p><b class="blue-text">Pagato:</b> ' + innerValue.pagata + '</p>' +
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
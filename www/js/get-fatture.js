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
                        var pagato = (innerValue.pagata == 0) ? "No" : "Si";
                        var contratto = (innerValue.contratto == "") ? "Non definito" : innerValue.contratto
                        var content = "<div data-role='collapsible' id='" + innerValue.numero + "'><h3>Fattura nr. " + innerValue.numero + "</h3>" +
                            '<p><b class="blue-text">Anno:</b> ' + innerValue.anno + '</p>' +
                            '<p><b class="blue-text">Data:</b> ' + innerValue.data + '</p>' +
                            '<p><b class="blue-text">Importo:</b> ' + innerValue.importo + ' &euro;</p>' +
                            '<p><b class="blue-text">Contratto:</b><span class="text-transfor-none"> ' + contratto + '</span></p>' +
                            '<p><b class="blue-text">Pagato:</b><span class="text-transfor-none"> ' + pagato + '</span></p>' +
                            '<div class="ui-grid-a ui-responsive">' +
                            '<div class="ui-block-a"><a href="#" id="visualizza" data-value="' + innerValue.numero + '" class="ui-btn ui-shadow ui-corner-all">Visualizza</a></div>' +
                            '<div class="ui-block-b"><a href="#" id="scarica" data-value="' + innerValue.numero + '" class="ui-btn ui-shadow ui-corner-all">Prepara file</a></div>' +
                            '</div></div>';
                        $("#fatture-list").append( content ).collapsibleset('refresh');
                    });
                })
            } else {
                //TODO mostrare il messaggio di errore ritornato;
            }
        }
    );
}
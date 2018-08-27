function getFatture(){

    var promise = httpPost('php/ajax/get_fatture.php');

    promise.then(
        function (data) {
            if (data.result) {
                //TODO redirect sulla pagina giusta
                $.each(data.fatture, function (key, value) {
                    var label = $('<a href="#" data-inset="false" class="fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + key + '</a>');
                    $('#fatture-list').append(label);

                    $.each(value, function (innerKey, innerValue) {
                        var pagato = (innerValue.pagata == 0) ? "No" : "Si";
                        var contratto = (innerValue.contratto == "") ? "Non definito" : innerValue.contratto
                        var content = "<div data-role='collapsible' id='" + innerValue.numero + "' data-inset='false'><h3>Fattura nr. " + innerValue.numero + "</h3>";
                        $.each(innerValue, function (lastKey, lastValue) {
                            content += '<a href="#" class="ui-btn fatture-item"><p class="float-left"><b class="blue-text">' + lastKey + ':</b> </p><p class="float-right">' + lastValue + '</p></a>';
                        });
                        content += '<div class="ui-grid-a ui-responsive">' +
                            '<div class="ui-block-a"><a href="#" id="visualizza" data-value="' + innerValue.numero + '" class="ui-btn ui-shadow ui-corner-all visualizza-button">Visualizza</a></div>' +
                            '<div class="ui-block-b"><a href="#" id="scarica" data-value="' + innerValue.numero + '" class="ui-btn ui-shadow ui-corner-all carica-button">Prepara file</a></div>' +
                            '<div class="ui-block-b"><a href="#" id="rapporto" data-value="' + innerValue.numero + '" class="ui-btn ui-shadow ui-corner-all visualizza-button">Visualizza rapporto</a></div>' +
                            '</div>'
                        content += '</div></div>';
                        $("#fatture-list").append( content ).collapsibleset('refresh');
                    });
                })
            } else {
                //TODO mostrare il messaggio di errore ritornato;
            }
        }
    );
}
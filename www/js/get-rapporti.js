function getRapporti() {
    var contrattiPromise = httpPost('php/ajax/get_rapporti.php');

    contrattiPromise.then(
        function (data) {
            if (data.result) {
                console.log(data[0]);
                $.each(data[0], function (key, value) {
                    var label = $('<a href="#" data-inset="false" class="fatture-header ui-shadow ui-btn ui-corner-all ui-header">' + key + '</a>');
                    $('#rapporti-list').append(label);
                    $.each(value, function (innerKey, innerValue) {
                        var content = "<div data-role='collapsible'><h3>" + innerKey + "</h3>";
                        $.each(innerValue, function (lastKey, lastValue) {
                            content += '<a href="../www/PhoenixData/' + innerValue.path + '.pdf" class="ui-btn">Intervento del ' + lastValue.anno + '</a>';
                            if(lastValue.registro === 'si')
                                content += '<a href="../www/PhoenixData/' + innerValue.path + '-Registro.pdf" class="ui-btn gray-text">Registro</span> del ' + lastValue.anno + '</a>';
                        });
                        content += '</div>';
                        $("#rapporti-list").append( content ).collapsibleset('refresh');
                    })
                    //TODO capire che tipo di valore ha key, con alcuni utenti ritorna un numero con altri una stringa

                })
            } else {
                //TODO mostrare il messaggio di errore ritornato;

            }
        }
    );
}